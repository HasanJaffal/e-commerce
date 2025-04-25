using Backend.Models.Domain;

namespace Backend.Services.Utils
{
    public interface IImageService
    {
        Task<string> UploadImageAsync(IFormFile file);
    }
}