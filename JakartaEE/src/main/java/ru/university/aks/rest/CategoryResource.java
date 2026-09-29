package ru.university.aks.rest;

import jakarta.ejb.EJB;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import ru.university.aks.dto.CategoryDto;
import ru.university.aks.model.Category;
import ru.university.aks.service.CategoryService;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Path("/categories")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class CategoryResource {

    @EJB
    private CategoryService categoryService;

    @GET
    public Response getAllCategories() {
        List<CategoryDto> list = categoryService.findAll().stream()
                .map(CategoryDto::fromEntity)
                .collect(Collectors.toList());
        return Response.ok(list).build();
    }

    @GET
    @Path("/{id}")
    public Response getCategoryById(@PathParam("id") Long id) {
        Category category = categoryService.findById(id);
        if (category == null) {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity(Map.of("error", "Категория с ID " + id + " не найдена"))
                    .build();
        }
        return Response.ok(CategoryDto.fromEntity(category)).build();
    }

    @POST
    public Response createCategory(CategoryDto dto) {
        if (dto == null || dto.getName() == null || dto.getName().trim().isEmpty()) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity(Map.of("error", "Название категории обязательно для заполнения"))
                    .build();
        }
        try {
            Category category = new Category(dto.getName().trim(), dto.getDescription());
            Category created = categoryService.create(category);
            return Response.status(Response.Status.CREATED)
                    .entity(CategoryDto.fromEntity(created))
                    .build();
        } catch (Exception e) {
            String msg = e.getMessage() != null ? e.getMessage() : "Ошибка создания категории";
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity(Map.of("error", msg))
                    .build();
        }
    }

    @PUT
    @Path("/{id}")
    public Response updateCategory(@PathParam("id") Long id, CategoryDto dto) {
        if (dto == null || dto.getName() == null || dto.getName().trim().isEmpty()) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity(Map.of("error", "Название категории обязательно для заполнения"))
                    .build();
        }
        try {
            Category category = new Category(dto.getName().trim(), dto.getDescription());
            category.setId(id);
            Category updated = categoryService.update(category);
            return Response.ok(CategoryDto.fromEntity(updated)).build();
        } catch (Exception e) {
            String msg = e.getMessage() != null ? e.getMessage() : "Ошибка обновления категории";
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity(Map.of("error", msg))
                    .build();
        }
    }

    @DELETE
    @Path("/{id}")
    public Response deleteCategory(@PathParam("id") Long id) {
        try {
            boolean deleted = categoryService.delete(id);
            if (!deleted) {
                return Response.status(Response.Status.NOT_FOUND)
                        .entity(Map.of("error", "Категория с ID " + id + " не найдена"))
                        .build();
            }
            return Response.ok(Map.of("message", "Категория успешно удалена")).build();
        } catch (IllegalStateException e) {
            String msg = e.getMessage() != null ? e.getMessage() : "Конфликт данных при удалении";
            return Response.status(Response.Status.CONFLICT)
                    .entity(Map.of("error", msg))
                    .build();
        } catch (Exception e) {
            String msg = e.getMessage() != null ? e.getMessage() : e.getClass().getSimpleName();
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity(Map.of("error", msg))
                    .build();
        }
    }
}
