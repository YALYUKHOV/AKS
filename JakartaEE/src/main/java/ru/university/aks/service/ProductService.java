package ru.university.aks.service;

import jakarta.ejb.Stateless;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import ru.university.aks.model.Category;
import ru.university.aks.model.Product;

import java.util.List;

@Stateless
public class ProductService {

    @PersistenceContext(unitName = "aksPU")
    private EntityManager em;

    public List<Product> findAll() {
        return em.createQuery("SELECT p FROM Product p JOIN FETCH p.category ORDER BY p.id DESC", Product.class)
                .getResultList();
    }

    public Product findById(Long id) {
        if (id == null) return null;
        return em.find(Product.class, id);
    }

    public List<Product> findByCategoryId(Long categoryId) {
        if (categoryId == null) return findAll();
        return em.createQuery("SELECT p FROM Product p JOIN FETCH p.category WHERE p.category.id = :catId ORDER BY p.id DESC", Product.class)
                .setParameter("catId", categoryId)
                .getResultList();
    }

    public Product create(Product product, Long categoryId) {
        if (product == null) {
            throw new IllegalArgumentException("Товар не может быть null");
        }
        if (categoryId == null) {
            throw new IllegalArgumentException("Категория должна быть указана");
        }
        Category category = em.find(Category.class, categoryId);
        if (category == null) {
            throw new IllegalArgumentException("Категория с ID " + categoryId + " не найдена");
        }
        product.setCategory(category);
        em.persist(product);
        return product;
    }

    public Product update(Product product, Long categoryId) {
        if (product == null || product.getId() == null) {
            throw new IllegalArgumentException("Товар и его ID не могут быть null при обновлении");
        }
        Product existing = em.find(Product.class, product.getId());
        if (existing == null) {
            throw new IllegalArgumentException("Товар с ID " + product.getId() + " не найден");
        }

        if (categoryId != null) {
            Category category = em.find(Category.class, categoryId);
            if (category == null) {
                throw new IllegalArgumentException("Категория с ID " + categoryId + " не найдена");
            }
            existing.setCategory(category);
        }

        existing.setName(product.getName());
        existing.setDescription(product.getDescription());
        existing.setPrice(product.getPrice());
        existing.setQuantity(product.getQuantity());
        existing.setSku(product.getSku());

        return existing;
    }

    public boolean delete(Long id) {
        if (id == null) return false;
        Product product = em.find(Product.class, id);
        if (product != null) {
            em.remove(product);
            return true;
        }
        return false;
    }
}
