package com.university.eventmanagement.controller;

import com.university.eventmanagement.dto.category.CategoryDto;
import com.university.eventmanagement.dto.common.ApiResponse;
import com.university.eventmanagement.service.CategoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<CategoryDto>>> getAllCategories() {
        return ResponseEntity.ok(ApiResponse.success(categoryService.getAllCategories()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<CategoryDto>> getCategoryById(@PathVariable String id) {
        return ResponseEntity.ok(ApiResponse.success(categoryService.getCategoryById(id)));
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'FACULTY_ADMINISTRATOR')")
    public ResponseEntity<ApiResponse<CategoryDto>> createCategory(@Valid @RequestBody CategoryDto categoryDto) {
        CategoryDto created = categoryService.createCategory(categoryDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success("Category created", created));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'FACULTY_ADMINISTRATOR')")
    public ResponseEntity<ApiResponse<CategoryDto>> updateCategory(
            @PathVariable String id,
            @Valid @RequestBody CategoryDto categoryDto) {
        CategoryDto updated = categoryService.updateCategory(id, categoryDto);
        return ResponseEntity.ok(ApiResponse.success("Category updated", updated));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> deleteCategory(@PathVariable String id) {
        categoryService.deleteCategory(id);
        return ResponseEntity.ok(ApiResponse.success("Category deleted", null));
    }
}
