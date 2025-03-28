using Backend.Models.Domain;
using Backend.Models.DTOs;

namespace Backend.Services
{
    public interface IItemService
    {
        Task<Item> CreateItemAsync(Item item);
        Task<QueryResponse<Item>> GetItemsAsync(QueryRequest queryRequest);
        Task<Item> GetItemByIdAsync(int id);
        Task<Item> UpdateItemAsync(Item item);
        Task<bool> DeleteItemAsync(int id);
    }
}
