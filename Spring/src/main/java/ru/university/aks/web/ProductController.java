package ru.university.aks.web;

import jakarta.validation.Valid;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import ru.university.aks.service.BusinessException;
import ru.university.aks.service.CategoryService;
import ru.university.aks.service.ProductService;
import ru.university.aks.web.form.ProductForm;

@Controller
@RequestMapping("/products")
public class ProductController {

    private final ProductService productService;
    private final CategoryService categoryService;

    public ProductController(ProductService productService, CategoryService categoryService) {
        this.productService = productService;
        this.categoryService = categoryService;
    }

    @GetMapping
    public String list(@RequestParam(required = false) Long categoryId, Model model) {
        model.addAttribute("products", productService.findAll(categoryId));
        model.addAttribute("categories", categoryService.findAll());
        model.addAttribute("selectedCategoryId", categoryId);
        return "products/list";
    }

    @GetMapping("/new")
    public String createForm(@RequestParam(required = false) Long categoryId, Model model) {
        ProductForm form = new ProductForm();
        form.setCategoryId(categoryId);
        return showForm(form, null, model);
    }

    @PostMapping
    public String create(@Valid @ModelAttribute("form") ProductForm form, BindingResult result,
                         Model model, RedirectAttributes redirect) {
        if (result.hasErrors()) {
            return showForm(form, null, model);
        }
        try {
            productService.create(form.toEntity(), form.getCategoryId());
        } catch (BusinessException e) {
            result.reject("business", e.getMessage());
            return showForm(form, null, model);
        }
        redirect.addFlashAttribute("success", "Товар «" + form.getName().trim() + "» добавлен");
        return "redirect:/products";
    }

    @GetMapping("/{id}/edit")
    public String editForm(@PathVariable Long id, Model model) {
        return showForm(ProductForm.fromEntity(productService.findById(id)), id, model);
    }

    @PostMapping("/{id}")
    public String update(@PathVariable Long id, @Valid @ModelAttribute("form") ProductForm form,
                         BindingResult result, Model model, RedirectAttributes redirect) {
        if (result.hasErrors()) {
            return showForm(form, id, model);
        }
        try {
            productService.update(id, form.toEntity(), form.getCategoryId());
        } catch (BusinessException e) {
            result.reject("business", e.getMessage());
            return showForm(form, id, model);
        }
        redirect.addFlashAttribute("success", "Товар «" + form.getName().trim() + "» обновлён");
        return "redirect:/products";
    }

    @PostMapping("/{id}/delete")
    public String delete(@PathVariable Long id, RedirectAttributes redirect) {
        productService.delete(id);
        redirect.addFlashAttribute("success", "Товар удалён");
        return "redirect:/products";
    }

    private String showForm(ProductForm form, Long id, Model model) {
        model.addAttribute("form", form);
        model.addAttribute("productId", id);
        model.addAttribute("categories", categoryService.findAll());
        return "products/form";
    }
}
