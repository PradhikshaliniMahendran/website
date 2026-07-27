package com.university.eventmanagement.service.impl;

import com.university.eventmanagement.dto.category.CategoryDto;
import com.university.eventmanagement.entity.Category;
import com.university.eventmanagement.exception.BadRequestException;
import com.university.eventmanagement.exception.ResourceNotFoundException;
import com.university.eventmanagement.repository.CategoryRepository;
import com.university.eventmanagement.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;

    @Override
    public List<CategoryDto> getAllCategories() {
        return categoryRepository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    public CategoryDto getCategoryById(String id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + id));
        return mapToDto(category);
    }

    @Override
    public CategoryDto createCategory(CategoryDto categoryDto) {
        if (categoryRepository.existsByName(categoryDto.getName())) {
            throw new BadRequestException("Category name already exists: " + categoryDto.getName());
        }

        String slug = categoryDto.getName().toLowerCase().replaceAll("[^a-z0-9]", "-");

        Category category = Category.builder()
                .name(categoryDto.getName())
                .slug(slug)
                .description(categoryDto.getDescription())
                .iconName(categoryDto.getIconName())
                .badgeColor(categoryDto.getBadgeColor())
                .imageUrl(categoryDto.getImageUrl())
                .build();

        Category saved = categoryRepository.save(category);
        return mapToDto(saved);
    }

    @Override
    public CategoryDto updateCategory(String id, CategoryDto categoryDto) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + id));

        category.setName(categoryDto.getName());
        category.setSlug(categoryDto.getName().toLowerCase().replaceAll("[^a-z0-9]", "-"));
        category.setDescription(categoryDto.getDescription());
        category.setIconName(categoryDto.getIconName());
        category.setBadgeColor(categoryDto.getBadgeColor());
        category.setImageUrl(categoryDto.getImageUrl());

        Category updated = categoryRepository.save(category);
        return mapToDto(updated);
    }

    @Override
    public void deleteCategory(String id) {
        if (!categoryRepository.existsById(id)) {
            throw new ResourceNotFoundException("Category not found with id: " + id);
        }
        categoryRepository.deleteById(id);
    }

    private CategoryDto mapToDto(Category category) {
        return CategoryDto.builder()
                .id(category.getId())
                .name(category.getName())
                .slug(category.getSlug())
                .description(category.getDescription())
                .iconName(category.getIconName())
                .badgeColor(category.getBadgeColor())
                .imageUrl(category.getImageUrl())
                .createdAt(category.getCreatedAt())
                .build();
    }
}
