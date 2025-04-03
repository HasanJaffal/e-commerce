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
        private readonly IImageService _imageService;
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
