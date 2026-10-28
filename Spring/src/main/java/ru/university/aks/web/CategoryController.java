package ru.university.aks.web;

import jakarta.validation.Valid;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import ru.university.aks.service.BusinessException;
import ru.university.aks.service.CategoryService;
import ru.university.aks.web.form.CategoryForm;

@Controller
@RequestMapping("/categories")
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping
    public String list(Model model) {
        model.addAttribute("categories", categoryService.findAll());
        model.addAttribute("productCounts", categoryService.productCounts());
        return "categories/list";
    }

    @GetMapping("/new")
    public String createForm(Model model) {
        return showForm(new CategoryForm(), null, model);
    }

    @PostMapping
    public String create(@Valid @ModelAttribute("form") CategoryForm form, BindingResult result,
                         Model model, RedirectAttributes redirect) {
        if (result.hasErrors()) {
            return showForm(form, null, model);
        }
        try {
            categoryService.create(form.toEntity());
        } catch (BusinessException e) {
            result.reject("business", e.getMessage());
            return showForm(form, null, model);
        }
        redirect.addFlashAttribute("success", "Категория «" + form.getName().trim() + "» добавлена");
        return "redirect:/categories";
    }

    @GetMapping("/{id}/edit")
    public String editForm(@PathVariable Long id, Model model) {
        return showForm(CategoryForm.fromEntity(categoryService.findById(id)), id, model);
    }

    @PostMapping("/{id}")
    public String update(@PathVariable Long id, @Valid @ModelAttribute("form") CategoryForm form,
                         BindingResult result, Model model, RedirectAttributes redirect) {
        if (result.hasErrors()) {
            return showForm(form, id, model);
        }
        try {
            categoryService.update(id, form.toEntity());
        } catch (BusinessException e) {
            result.reject("business", e.getMessage());
            return showForm(form, id, model);
        }
        redirect.addFlashAttribute("success", "Категория «" + form.getName().trim() + "» обновлена");
        return "redirect:/categories";
    }

    @PostMapping("/{id}/delete")
    public String delete(@PathVariable Long id, RedirectAttributes redirect) {
        try {
            categoryService.delete(id);
            redirect.addFlashAttribute("success", "Категория удалена");
        } catch (BusinessException e) {
            redirect.addFlashAttribute("error", e.getMessage());
        }
        return "redirect:/categories";
    }

    private String showForm(CategoryForm form, Long id, Model model) {
        model.addAttribute("form", form);
        model.addAttribute("categoryId", id);
        return "categories/form";
    }
}
