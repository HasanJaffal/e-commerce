using Backend.Data;
using Backend.Models.Domain;
using Backend.Models.DTOs;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services
{
    public class CategoryService : ICategoryService
    {
        private static AppDbContext _context;
        public CategoryService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Category> CreateCategoryAsync(Category category)
        {
            await _context.Categories.AddAsync(category);
            await _context.SaveChangesAsync();
            return category;
        }

        public async Task<QueryResponse<Category>> GetCategoriesAsync(QueryRequest queryRequest)
        {
            var totalCategories = await _context.Categories.CountAsync();

            var filteredCategories = new List<Category>();

            // Filtering
            if (queryRequest.Serach != null)
            {
                filteredCategories = await _context.Categories
                    .Where(x => x.Name.ToUpper().Contains(queryRequest.Serach.ToUpper()))
                    .ToListAsync();
            }
            else
            {
                filteredCategories = await _context.Categories.ToListAsync();
            }

            // Pagination
            var skip = (queryRequest.Page - 1) * queryRequest.PageSize;
            var pagedCategories = filteredCategories.Skip(skip).Take(queryRequest.PageSize);

            var response = new QueryResponse<Category>
            {
                Objects = pagedCategories,
                TotalCount = totalCategories,
                PageSize = queryRequest.PageSize,
                CurrentPage = queryRequest.Page,
                TotalPages = (int)Math.Ceiling((double)totalCategories / queryRequest.PageSize)
            };

            return response;
        }

        public async Task<Category> GetCategoryByIdAsync(int id)
        {
            return await _context.Categories.FindAsync(id);
        }

        public async Task<Category> UpdateCategoryAsync(Category category)
        {
            _context.Categories.Update(category);
            await _context.SaveChangesAsync();
            return category;
        }

        public async Task<bool> DeleteCategoryAsync(int id)
        {
            var category = await _context.Categories.FindAsync(id);
            if (category == null)
            {
                return false;
            }
            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<Item>> GetItemsByCategoryId(int id)
        {
            return await _context.Items.Where(item => item.CategoryId == id).ToListAsync();
        }
    }
}
