package ru.university.aks.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import ru.university.aks.model.Product;

import java.math.BigDecimal;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query("SELECT p FROM Product p JOIN FETCH p.category ORDER BY p.id DESC")
    List<Product> findAllWithCategory();

    @Query("SELECT p FROM Product p JOIN FETCH p.category c WHERE c.id = :categoryId ORDER BY p.id DESC")
    List<Product> findByCategoryIdWithCategory(Long categoryId);

    long countByCategoryId(Long categoryId);

    boolean existsBySkuIgnoreCase(String sku);

    boolean existsBySkuIgnoreCaseAndIdNot(String sku, Long id);

    @Query("SELECT COALESCE(SUM(p.price * p.quantity), 0) FROM Product p")
    BigDecimal totalStockValue();

    @Query("SELECT COALESCE(SUM(p.quantity), 0) FROM Product p")
    Long totalQuantity();
}
