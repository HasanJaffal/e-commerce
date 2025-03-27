namespace Backend.Models.DTOs.Item
{
    public class UpdateItemDto
    {
        public string Name { get; set; }
        public decimal Price { get; set; }
        public int CategoryId { get; set; }
    }
}