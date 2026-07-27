package com.university.eventmanagement.service.impl;

import com.university.eventmanagement.dto.common.FileUploadResponse;
import com.university.eventmanagement.exception.BadRequestException;
import com.university.eventmanagement.service.FileStorageService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
public class FileStorageServiceImpl implements FileStorageService {

    private final Path fileStorageLocation;

    public FileStorageServiceImpl(@Value("${app.upload.dir:./uploads}") String uploadDir) {
        this.fileStorageLocation = Paths.get(uploadDir).toAbsolutePath().normalize();
        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception ex) {
            throw new BadRequestException("Could not create upload directory");
        }
    }

    @Override
    public FileUploadResponse storeFile(MultipartFile file) {
        String originalFileName = StringUtils.cleanPath(file.getOriginalFilename() != null ? file.getOriginalFilename() : "upload.png");

        try {
            if (originalFileName.contains("..")) {
                throw new BadRequestException("Filename contains invalid path sequence " + originalFileName);
            }

            String fileExtension = "";
            int i = originalFileName.lastIndexOf('.');
            if (i > 0) {
                fileExtension = originalFileName.substring(i);
            }

            String newFileName = UUID.randomUUID().toString() + fileExtension;
            Path targetLocation = this.fileStorageLocation.resolve(newFileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            String fileDownloadUri = "/api/v1/uploads/" + newFileName;

            return FileUploadResponse.builder()
                    .fileName(newFileName)
                    .fileUrl(fileDownloadUri)
                    .fileType(file.getContentType())
                    .size(file.getSize())
                    .build();

        } catch (IOException ex) {
            throw new BadRequestException("Could not store file " + originalFileName + ". Please try again!");
        }
    }
}
