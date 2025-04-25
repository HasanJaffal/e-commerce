using Backend.Models.DTOs.Item;

namespace Backend.Services.Domain
{
    public interface IItemService
    {
        Task<ItemDto> CreateItemAsync(CreateItemDto createItemDto);
        Task<ItemDto> GetItemByIdAsync(int id);
        Task<ItemDto> UpdateItemAsync(int id, UpdateItemDto updateItemDto);
        Task<bool> DeleteItemAsync(int id);
    }
}
