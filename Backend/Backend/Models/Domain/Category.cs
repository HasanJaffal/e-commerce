namespace Backend.Models.Domain
{
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        // NAVIGATION PROPERTY
        public ICollection<Item> Items { get; set; }
    }
}
