namespace Backend.Models.Domain
{
    public class Image
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public int ItemId { get; set; }

        // NAVIGATION PROPERTY
        public Item Item { get; set; }
    }
}
