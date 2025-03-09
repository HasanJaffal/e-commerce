using Backend.Models.Domain;
using Backend.Models.DTOs;

namespace Backend.Services
{
    public interface ICategoryService
    {
        Task<Category> CreateCategoryAsync(Category category);
        Task<IEnumerable<Category>> GetCategoriesAsync();
    }
}
