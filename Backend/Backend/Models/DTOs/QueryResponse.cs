namespace Backend.Models.DTOs
{
    public class QueryResponse<T>
    {
        public IEnumerable<T> Objects { get; set; } = [];
        public int TotalCount { get; set; }
        public int TotalPages { get; set; }
        public int CurrentPage { get; set; }
        public int PageSize { get; set; }
    }
}
