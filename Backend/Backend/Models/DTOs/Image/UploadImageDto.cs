namespace Backend.Models.DTOs.Image
{
    public class UploadImageDto
    {
        public IFormFile Image { get; set; }
        public int ItemId { get; set; }
    }
}
