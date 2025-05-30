﻿namespace Backend.Models.DTOs.Item
{
    public class CreateItemDto
    {
        public string Name { get; set; }
        public decimal Price { get; set; }
        public int CategoryId { get; set; }
        public IFormFile? Image { get; set; }
    }
}
