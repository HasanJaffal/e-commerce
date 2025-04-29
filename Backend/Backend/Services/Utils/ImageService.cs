using AutoMapper;
using Backend.Data;
using Backend.Models.Domain;
using Newtonsoft.Json.Linq;

namespace Backend.Services.Utils
{
    public class ImageService : IImageService
    {
        private readonly HttpClient _httpClient;
        private readonly IMapper _mapper;
        private const string ApiKey = "4a01e13b4e5131805bec2af0b8c1776e";
        private const string UploadUrl = "https://api.imgbb.com/1/upload";

        public ImageService(HttpClient httpClient, AppDbContext context, IMapper mapper)
        {
            _httpClient = httpClient;
            _mapper = mapper;
        }

        public async Task<string> UploadImageAsync(IFormFile file)
        {
            IFormFile image = file;

            if (image == null || image.Length == 0)
            {
                return "";
            }

            using var memoryStream = new MemoryStream();
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
            return url;
        }    }
}
