using Backend.Models.Domain;
using Backend.Models.DTOs.Image;

namespace Backend.Services
{
    public interface IImageService
    {
        Task<ImageDto> UploadImageAsync(UploadImageDto uploadImageDto);
    }
}