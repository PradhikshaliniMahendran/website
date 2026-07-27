package com.university.eventmanagement.controller;

import com.university.eventmanagement.dto.common.ApiResponse;
import com.university.eventmanagement.dto.common.FileUploadResponse;
import com.university.eventmanagement.service.FileStorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/files")
@RequiredArgsConstructor
public class FileUploadController {

    private final FileStorageService fileStorageService;

    @PostMapping("/upload")
    public ResponseEntity<ApiResponse<FileUploadResponse>> uploadFile(@RequestParam("file") MultipartFile file) {
        FileUploadResponse response = fileStorageService.storeFile(file);
        return ResponseEntity.ok(ApiResponse.success("File uploaded successfully", response));
    }
}
