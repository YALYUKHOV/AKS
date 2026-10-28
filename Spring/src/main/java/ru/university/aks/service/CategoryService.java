package ru.university.aks.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.university.aks.model.Category;
import ru.university.aks.repository.CategoryRepository;
import ru.university.aks.repository.ProductRepository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional(readOnly = true)
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;

    public CategoryService(CategoryRepository categoryRepository, ProductRepository productRepository) {
        this.categoryRepository = categoryRepository;
        this.productRepository = productRepository;
    }

    public List<Category> findAll() {
        return categoryRepository.findAllByOrderByIdAsc();
    }

    public Category findById(Long id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Категория с ID " + id + " не найдена"));
    }

    public Map<Long, Long> productCounts() {
        Map<Long, Long> counts = new HashMap<>();
        for (Object[] row : categoryRepository.countProductsByCategory()) {
            counts.put((Long) row[0], (Long) row[1]);
        }
        return counts;
    }

    public long count() {
        return categoryRepository.count();
    }

    @Transactional
    public Category create(Category category) {
        if (categoryRepository.existsByNameIgnoreCase(category.getName())) {
            throw new BusinessException("Категория с названием «" + category.getName() + "» уже существует");
        }
        return categoryRepository.save(category);
    }

    @Transactional
    public Category update(Long id, Category data) {
        Category existing = findById(id);
        if (categoryRepository.existsByNameIgnoreCaseAndIdNot(data.getName(), id)) {
            throw new BusinessException("Категория с названием «" + data.getName() + "» уже существует");
        }
        existing.setName(data.getName());
        existing.setDescription(data.getDescription());
        return existing;
    }

    @Transactional
    public void delete(Long id) {
        Category category = findById(id);
        long count = productRepository.countByCategoryId(id);
        if (count > 0) {
            throw new BusinessException("Нельзя удалить категорию, к которой привязаны товары (количество: " + count + ")");
        }
        categoryRepository.delete(category);
    }
}
