namespace Backend.Models.Domain
{
    public class Item
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public int CategoryId { get; set; }

        // NAVIGATION PROPERTY
        public Category Category { get; set; }
        public Image Image { get; set; }
    }
}
