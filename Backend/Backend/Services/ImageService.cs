using AutoMapper;
using Backend.Data;
using Backend.Models.Domain;
using Backend.Models.DTOs.Image;
using Newtonsoft.Json.Linq;

namespace Backend.Services
{
    public class ImageService : IImageService
    {
        private readonly HttpClient _httpClient;
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;
        private const string ApiKey = "4a01e13b4e5131805bec2af0b8c1776e";
        private const string UploadUrl = "https://api.imgbb.com/1/upload";

        public ImageService(HttpClient httpClient, AppDbContext context, IMapper mapper)
        {
            _httpClient = httpClient;
            _context = context;
            _mapper = mapper;
        }

        public async Task<ImageDto> UploadImageAsync(UploadImageDto uploadImageDto)
        {
            IFormFile image = uploadImageDto.Image;

            if (image == null || image.Length == 0)
            {
                throw new ArgumentException("Invalid image file.");
            }

            using var memoryStream = new System.IO.MemoryStream();
            await image.CopyToAsync(memoryStream);
            var imageBytes = memoryStream.ToArray();
            var base64Image = Convert.ToBase64String(imageBytes);

            using var content = new MultipartFormDataContent();
            content.Add(new StringContent(base64Image), "image");
            content.Add(new StringContent(ApiKey), "key");

            var response = await _httpClient.PostAsync(UploadUrl, content);
            if (!response.IsSuccessStatusCode)
            {
                throw new Exception($"Error uploading image: {response.StatusCode}");
            }

            var jsonResponse = await response.Content.ReadAsStringAsync();
            var jsonObject = JObject.Parse(jsonResponse);

            var url = jsonObject["data"]?["url"]?.ToString() ?? string.Empty;
            var insertImageDto = new InsertImageDto
            {
                Url = url,
                ItemId = uploadImageDto.ItemId
            };
            var finalImage = await _context.Images.AddAsync(_mapper.Map<Image>(insertImageDto));
            await _context.SaveChangesAsync();
            return _mapper.Map<ImageDto>(finalImage.Entity);
        }
    }
}
