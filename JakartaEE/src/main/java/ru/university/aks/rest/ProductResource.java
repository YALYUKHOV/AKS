package ru.university.aks.rest;

import jakarta.ejb.EJB;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import ru.university.aks.dto.ProductDto;
import ru.university.aks.model.Product;
import ru.university.aks.service.ProductService;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Path("/products")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ProductResource {

    @EJB
    private ProductService productService;

    @GET
    public Response getAllProducts(@QueryParam("categoryId") Long categoryId) {
        List<Product> products = (categoryId != null && categoryId > 0)
                ? productService.findByCategoryId(categoryId)
                : productService.findAll();

        List<ProductDto> dtos = products.stream()
                .map(ProductDto::fromEntity)
                .collect(Collectors.toList());

        return Response.ok(dtos).build();
    }

    @GET
    @Path("/{id}")
    public Response getProductById(@PathParam("id") Long id) {
        Product product = productService.findById(id);
        if (product == null) {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity(Map.of("error", "Товар с ID " + id + " не найден"))
                    .build();
        }
        return Response.ok(ProductDto.fromEntity(product)).build();
    }

    @POST
    public Response createProduct(ProductDto dto) {
        String validationError = validateProductDto(dto);
        if (validationError != null) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity(Map.of("error", validationError))
                    .build();
        }

        try {
            Product product = new Product();
            product.setName(dto.getName().trim());
            product.setDescription(dto.getDescription());
            product.setPrice(dto.getPrice());
            product.setQuantity(dto.getQuantity() != null ? dto.getQuantity() : 0);
            product.setSku(dto.getSku().trim().toUpperCase());

            Product created = productService.create(product, dto.getCategoryId());
            return Response.status(Response.Status.CREATED)
                    .entity(ProductDto.fromEntity(created))
                    .build();
        } catch (Exception e) {
            String msg = e.getMessage() != null ? e.getMessage() : "Ошибка создания товара";
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity(Map.of("error", msg))
                    .build();
        }
    }

    @PUT
    @Path("/{id}")
    public Response updateProduct(@PathParam("id") Long id, ProductDto dto) {
        String validationError = validateProductDto(dto);
        if (validationError != null) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity(Map.of("error", validationError))
                    .build();
        }

        try {
            Product product = new Product();
            product.setId(id);
            product.setName(dto.getName().trim());
            product.setDescription(dto.getDescription());
            product.setPrice(dto.getPrice());
            product.setQuantity(dto.getQuantity() != null ? dto.getQuantity() : 0);
            product.setSku(dto.getSku().trim().toUpperCase());

            Product updated = productService.update(product, dto.getCategoryId());
            return Response.ok(ProductDto.fromEntity(updated)).build();
        } catch (Exception e) {
            String msg = e.getMessage() != null ? e.getMessage() : "Ошибка обновления товара";
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity(Map.of("error", msg))
                    .build();
        }
    }

    @DELETE
    @Path("/{id}")
    public Response deleteProduct(@PathParam("id") Long id) {
        try {
            boolean deleted = productService.delete(id);
            if (!deleted) {
                return Response.status(Response.Status.NOT_FOUND)
                        .entity(Map.of("error", "Товар с ID " + id + " не найден"))
                        .build();
            }
            return Response.ok(Map.of("message", "Товар успешно удален")).build();
        } catch (Exception e) {
            String msg = e.getMessage() != null ? e.getMessage() : "Ошибка удаления товара";
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity(Map.of("error", msg))
                    .build();
        }
    }

    private String validateProductDto(ProductDto dto) {
        if (dto == null) return "Тело запроса не может быть пустым";
        if (dto.getName() == null || dto.getName().trim().isEmpty()) {
            return "Название товара обязательно для заполнения";
        }
        if (dto.getPrice() == null || dto.getPrice().compareTo(BigDecimal.ZERO) < 0) {
            return "Цена товара должна быть неотрицательным числом";
        }
        if (dto.getQuantity() != null && dto.getQuantity() < 0) {
            return "Количество товара не может быть отрицательным";
        }
        if (dto.getSku() == null || dto.getSku().trim().isEmpty()) {
            return "Артикул (SKU) обязателен для заполнения";
        }
        if (dto.getCategoryId() == null || dto.getCategoryId() <= 0) {
            return "Категория должна быть выбрана";
        }
        return null;
    }
}
