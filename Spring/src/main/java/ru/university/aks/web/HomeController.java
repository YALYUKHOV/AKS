package ru.university.aks.web;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import ru.university.aks.service.CategoryService;
import ru.university.aks.service.ProductService;

@Controller
public class HomeController {

    private final CategoryService categoryService;
    private final ProductService productService;

    public HomeController(CategoryService categoryService, ProductService productService) {
        this.categoryService = categoryService;
        this.productService = productService;
    }

    @GetMapping("/")
    public String index(Model model) {
        model.addAttribute("categoriesCount", categoryService.count());
        model.addAttribute("productsCount", productService.count());
        model.addAttribute("totalQuantity", productService.totalQuantity());
        model.addAttribute("totalValue", productService.totalStockValue());
        model.addAttribute("categories", categoryService.findAll());
        model.addAttribute("productCounts", categoryService.productCounts());
        return "index";
    }
}
