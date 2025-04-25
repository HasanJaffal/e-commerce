using AutoMapper;
using AutoMapper.QueryableExtensions;
using Backend.Data;
using Backend.Models.Domain;
using Backend.Models.DTOs;
using Backend.Models.DTOs.Category;
using Backend.Models.DTOs.Item;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services.Domain
{
    public class CategoryService : ICategoryService
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public CategoryService(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<CategoryDto> CreateCategoryAsync(CreateCategoryDto createCategoryDto)
        {
            var category = _mapper.Map<Category>(createCategoryDto);
            if (category != null)
            {
                await _context.Categories.AddAsync(category);
                await _context.SaveChangesAsync();
                return _mapper.Map<CategoryDto>(category);
            }
            else
            {
                throw new Exception("Category creation failed.");
            }
        }

        public async Task<bool> DeleteCategoryAsync(int id)
        {
            var category = await _context.Categories
                .FirstOrDefaultAsync(c => c.Id == id);
            if (category == null)
                return false;
            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<List<CategoryDto>> GetCategoriesAsync()
        {
            var categories = await _context.Categories.ToListAsync();
            var categoryDtos = categories
                .Select(category => _mapper.Map<CategoryDto>(category))
                .ToList();
            return categoryDtos;

        }

        public async Task<CategoryDto> GetCategoryByIdAsync(int id)
        {
            var category = await _context.Categories
                .FirstOrDefaultAsync(c => c.Id == id);
            return _mapper.Map<CategoryDto>(category);
        }

        public async Task<CategoryDto> UpdateCategoryAsync(int id, UpdateCategoryDto updateCategoryDto)
        {
            var category = await _context.Categories.FindAsync(id);

            if (category == null)
            {
                throw new KeyNotFoundException("Category not found.");
            }

            _mapper.Map(updateCategoryDto, category);

            await _context.SaveChangesAsync();

            return _mapper.Map<CategoryDto>(category);
        }

        public async Task<QueryResponse<ItemDto>> GetItemsByCategoryName(string name, QueryRequest queryRequest)
        {
            var category = await _context.Categories
                .FirstOrDefaultAsync(c => c.Name.ToLower() == name.ToLower());

            var query = _context.Items.Where(i => i.CategoryId == category.Id).AsQueryable();

            if (!string.IsNullOrWhiteSpace(queryRequest.Search))
            {
                var search = queryRequest.Search.ToLower();
                query = query.Where(i => i.Name.ToLower().Contains(search));
            }

            var totalCount = await query.CountAsync();

            var totalPages = (int)Math.Ceiling(totalCount / (double)queryRequest.PageSize);
            var skip = (queryRequest.Page - 1) * queryRequest.PageSize;

            var items = await query
                .Skip(skip)
                .Take(queryRequest.PageSize)
                .ProjectTo<ItemDto>(_mapper.ConfigurationProvider)  // Mapping directly to DTO
                .ToListAsync();

            return new QueryResponse<ItemDto>
            {
                Objects = items,
                TotalCount = totalCount,
                TotalPages = totalPages,
                CurrentPage = queryRequest.Page,
                PageSize = queryRequest.PageSize
            };
        }

    }
}
