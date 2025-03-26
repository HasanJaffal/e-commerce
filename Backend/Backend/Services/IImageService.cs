using Backend.Models.Domain;

namespace Backend.Services
{
    public interface IImageService
    {
        Task<IEnumerable<Image>> GetImagesAsync();
        Task<Image> GetImageByIdAsync(int id);
        Task<Image> UpdateImageAsync(Image image);
        Task<bool> DeleteImageAsync(int id);
    }
}
