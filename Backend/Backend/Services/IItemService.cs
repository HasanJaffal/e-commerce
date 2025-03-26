using Backend.Models.Domain;

namespace Backend.Services
{
    public interface IItemService
    {
        Task<Item> CreateItemAsync(Item item);
        Task<IEnumerable<Item>> GetItemsAsync();
        Task<Item> GetItemByIdAsync(int id);
        Task<Item> UpdateItemAsync(Item item);
        Task<bool> DeleteItemAsync(int id);
    }
}
