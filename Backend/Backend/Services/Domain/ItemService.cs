using AutoMapper;
using Backend.Data;
using Backend.Models.Domain;
using Backend.Models.DTOs;
using Backend.Models.DTOs.Category;
using Backend.Models.DTOs.Item;
using Backend.Services.Utils;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services.Domain
{
    public class ItemService : IItemService
    {
        private readonly AppDbContext _context;
        private readonly IImageService _imageService;
        private readonly IMapper _mapper;
        public ItemService(AppDbContext context, IMapper mapper, IImageService imageService)
        {
            _context = context;
            _mapper = mapper;
            _imageService = imageService;
        }

        public async Task<ItemDto> CreateItemAsync(CreateItemDto createItemDto)
        {
            string imageUrl = await _imageService.UploadImageAsync(createItemDto.Image);

            var item = new Item
            {
                Name = createItemDto.Name,
                Price = createItemDto.Price,
                CategoryId = createItemDto.CategoryId,
                ImageUrl = imageUrl
            };

            var createdItem = await _context.Items.AddAsync(item);
            await _context.SaveChangesAsync();

            var itemDto = _mapper.Map<ItemDto>(createdItem.Entity);
            return itemDto;
        }


        public async Task<ItemDto> GetItemByIdAsync(int id)
        {
           var item = await _context.Items.FindAsync(id);
            return _mapper.Map<ItemDto>(item);
        }

        public async Task<ItemDto> UpdateItemAsync(int id, UpdateItemDto updateItemDto)
        {
            var item = await _context.Items.FindAsync(id);

            if (item == null)
            {
                throw new KeyNotFoundException("Item not found.");
            }

            string imageUrl = await _imageService.UploadImageAsync(updateItemDto.Image);

            item.Name = updateItemDto.Name;
            item.Price = updateItemDto.Price;
            item.ImageUrl = imageUrl;

            await _context.SaveChangesAsync();

            return _mapper.Map<ItemDto>(item);
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
    }
}
