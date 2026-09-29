package ru.university.aks.service;

import jakarta.ejb.Stateless;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import ru.university.aks.model.Category;

import java.util.List;

@Stateless
public class CategoryService {

    @PersistenceContext(unitName = "aksPU")
    private EntityManager em;

    public List<Category> findAll() {
        return em.createQuery("SELECT c FROM Category c ORDER BY c.id ASC", Category.class)
                .getResultList();
    }

    public Category findById(Long id) {
        if (id == null) return null;
        return em.find(Category.class, id);
    }

    public Category create(Category category) {
        if (category == null) {
            throw new IllegalArgumentException("Категория не может быть null");
        }
        em.persist(category);
        return category;
    }

    public Category update(Category category) {
        if (category == null || category.getId() == null) {
            throw new IllegalArgumentException("Категория и её ID не могут быть null при обновлении");
        }
        Category existing = em.find(Category.class, category.getId());
        if (existing == null) {
            throw new IllegalArgumentException("Категория с ID " + category.getId() + " не найдена");
        }
        existing.setName(category.getName());
        existing.setDescription(category.getDescription());
        return existing;
    }

    public boolean delete(Long id) {
        if (id == null) return false;
        Category category = em.find(Category.class, id);
        if (category != null) {
            Long count = em.createQuery("SELECT COUNT(p) FROM Product p WHERE p.category.id = :catId", Long.class)
                    .setParameter("catId", id)
                    .getSingleResult();
            if (count > 0) {
                throw new IllegalStateException("Нельзя удалить категорию, к которой привязаны товары (количество: " + count + ")");
            }
            em.remove(category);
            return true;
        }
        return false;
    }
}
