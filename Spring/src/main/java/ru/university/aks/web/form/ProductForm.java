package ru.university.aks.web.form;

import jakarta.validation.constraints.*;
import ru.university.aks.model.Product;

import java.math.BigDecimal;

public class ProductForm {

    @NotBlank(message = "Название товара обязательно для заполнения")
    @Size(max = 150, message = "Название не должно превышать 150 символов")
    private String name;

    private String description;

    @NotNull(message = "Укажите цену")
    @DecimalMin(value = "0.00", message = "Цена должна быть неотрицательной")
    @Digits(integer = 8, fraction = 2, message = "Не более 8 цифр до запятой и 2 после")
    private BigDecimal price;

    @NotNull(message = "Укажите количество")
    @Min(value = 0, message = "Количество не может быть отрицательным")
    private Integer quantity = 0;

    @NotBlank(message = "Артикул (SKU) обязателен для заполнения")
    @Size(max = 50, message = "Артикул не должен превышать 50 символов")
    private String sku;

    @NotNull(message = "Категория должна быть выбрана")
    private Long categoryId;

    public static ProductForm fromEntity(Product product) {
        ProductForm form = new ProductForm();
        form.setName(product.getName());
        form.setDescription(product.getDescription());
        form.setPrice(product.getPrice());
        form.setQuantity(product.getQuantity());
        form.setSku(product.getSku());
        form.setCategoryId(product.getCategory().getId());
        return form;
    }

    public Product toEntity() {
        Product product = new Product();
        product.setName(name.trim());
        product.setDescription(description == null || description.isBlank() ? null : description.trim());
        product.setPrice(price);
        product.setQuantity(quantity);
        product.setSku(sku.trim().toUpperCase());
        return product;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public String getSku() {
        return sku;
    }

    public void setSku(String sku) {
        this.sku = sku;
    }

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }
}
