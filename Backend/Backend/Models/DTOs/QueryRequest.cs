﻿namespace Backend.Models.DTOs
{
    public class QueryRequest
    {
        public string? Search { get; set; }
        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 100;

    }
}
