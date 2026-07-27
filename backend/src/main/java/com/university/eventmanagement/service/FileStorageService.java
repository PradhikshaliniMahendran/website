package com.university.eventmanagement.service;

import com.university.eventmanagement.dto.common.FileUploadResponse;
import org.springframework.web.multipart.MultipartFile;

public interface FileStorageService {
    FileUploadResponse storeFile(MultipartFile file);
}
