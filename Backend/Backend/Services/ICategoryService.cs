﻿using Backend.Models.Domain;
using Backend.Models.DTOs;

namespace Backend.Services
{
    public interface ICategoryService
    {
        Task<Category> CreateCategoryAsync(Category category);
        Task<QueryResponse<Category>> GetCategoriesAsync(QueryRequest queryRequest);
        Task<Category> GetCategoryByIdAsync(int id);
        Task<Category> UpdateCategoryAsync(Category category);
        Task<bool> DeleteCategoryAsync(int id);
        Task<IEnumerable<Item>> GetItemsByCategoryId(int id);
    }
}
