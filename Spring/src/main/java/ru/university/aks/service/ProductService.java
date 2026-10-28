package ru.university.aks.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.university.aks.model.Category;
import ru.university.aks.model.Product;
import ru.university.aks.repository.ProductRepository;

import java.math.BigDecimal;
import java.util.List;

@Service
@Transactional(readOnly = true)
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryService categoryService;

    public ProductService(ProductRepository productRepository, CategoryService categoryService) {
        this.productRepository = productRepository;
        this.categoryService = categoryService;
    }

    public List<Product> findAll(Long categoryId) {
        if (categoryId == null) {
            return productRepository.findAllWithCategory();
        }
        return productRepository.findByCategoryIdWithCategory(categoryId);
    }

    public Product findById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Товар с ID " + id + " не найден"));
    }

    public long count() {
        return productRepository.count();
    }

    public long totalQuantity() {
        return productRepository.totalQuantity();
    }

    public BigDecimal totalStockValue() {
        return productRepository.totalStockValue();
    }

    @Transactional
    public Product create(Product product, Long categoryId) {
        if (productRepository.existsBySkuIgnoreCase(product.getSku())) {
            throw new BusinessException("Товар с артикулом " + product.getSku() + " уже существует");
        }
        product.setCategory(categoryService.findById(categoryId));
        return productRepository.save(product);
    }

    @Transactional
    public Product update(Long id, Product data, Long categoryId) {
        Product existing = findById(id);
        if (productRepository.existsBySkuIgnoreCaseAndIdNot(data.getSku(), id)) {
            throw new BusinessException("Товар с артикулом " + data.getSku() + " уже существует");
        }
        Category category = categoryService.findById(categoryId);

        existing.setName(data.getName());
        existing.setDescription(data.getDescription());
        existing.setPrice(data.getPrice());
        existing.setQuantity(data.getQuantity());
        existing.setSku(data.getSku());
        existing.setCategory(category);
        return existing;
    }

    @Transactional
    public void delete(Long id) {
        productRepository.delete(findById(id));
    }
}
