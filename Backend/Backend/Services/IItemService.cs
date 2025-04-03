using Backend.Models.Domain;
using Backend.Models.DTOs;
using Backend.Models.DTOs.Image;

namespace Backend.Services
{
    public interface IItemService
    {
        Task<Item> CreateItemAsync(Item item);
        Task<Item> GetItemByIdAsync(int id);
        Task<Item> UpdateItemAsync(Item item);
        Task<bool> DeleteItemAsync(int id);
        Task<Image> GetImageByItemIdAsync(int itemId);
    }
}
