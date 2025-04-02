using Backend.Data;
using Backend.Models.Domain;
using Backend.Models.DTOs;
using Backend.Models.DTOs.Image;
using Backend.Models.DTOs.Item;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services
{
    public class ItemService : IItemService
    {
        private readonly AppDbContext _context;
        public ItemService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Item> CreateItemAsync(Item item)
        {
            await _context.Items.AddAsync(item);
            await _context.SaveChangesAsync();
            return item;
        }

        public async Task<QueryResponse<Item>> GetItemsAsync(QueryRequest queryRequest)
        {
            var totalItems = await _context.Items.CountAsync();
            var filteredItems = new List<Item>();

            // Filtering
            if (queryRequest.Search != null)
            {
                filteredItems = await _context.Items
                    .Where(x => x.Name.ToUpper().Contains(queryRequest.Search.ToUpper()))
                    .ToListAsync();
            }
            else
            {
                filteredItems = await _context.Items.ToListAsync();
            }

            // Pagination
            var skip = (queryRequest.Page - 1) * queryRequest.PageSize;
            var pagedItems = filteredItems.Skip(skip).Take(queryRequest.PageSize);

            var response = new QueryResponse<Item>
            {
                Objects = pagedItems,
                TotalCount = totalItems,
                PageSize = queryRequest.PageSize,
                CurrentPage = queryRequest.Page,
                TotalPages = (int)Math.Ceiling((double)totalItems / queryRequest.PageSize)
            };

            return response;
        }

        public async Task<Item> GetItemByIdAsync(int id)
        {
            return await _context.Items.FindAsync(id);
        }

        public async Task<Item> UpdateItemAsync(Item item)
        {
            _context.Items.Update(item);
            await _context.SaveChangesAsync();
            return item;
        }

        public async Task<bool> DeleteItemAsync(int id)
        {
            var item = await _context.Items.FindAsync(id);
            if (item == null)
            {
                return false;
            }
            _context.Items.Remove(item);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<Image> GetImageByItemIdAsync(int itemId)
        {
            var image = await _context.Images.FirstOrDefaultAsync(x => x.ItemId == itemId);
            return image;
        }
    }
}
