﻿namespace Backend.Models.DTOs
{
    public class UpdateItemDto
    {
        public string Name { get; set; }
        public decimal Price { get; set; }
        public int CategoryId { get; set; }
    }
}
