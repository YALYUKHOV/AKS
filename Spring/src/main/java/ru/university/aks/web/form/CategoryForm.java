package ru.university.aks.web.form;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import ru.university.aks.model.Category;

public class CategoryForm {

    @NotBlank(message = "Название категории обязательно для заполнения")
    @Size(max = 100, message = "Название не должно превышать 100 символов")
    private String name;

    private String description;

    public static CategoryForm fromEntity(Category category) {
        CategoryForm form = new CategoryForm();
        form.setName(category.getName());
        form.setDescription(category.getDescription());
        return form;
    }

    public Category toEntity() {
        return new Category(name.trim(), description == null || description.isBlank() ? null : description.trim());
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
}
