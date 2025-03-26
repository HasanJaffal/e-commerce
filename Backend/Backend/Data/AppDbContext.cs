using Backend.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Category> Categories { get; set; }
        public DbSet<Item> Items { get; set; }
        public DbSet<Image> Images { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Category>()
                .HasMany(c => c.Items)
                .WithOne(i => i.Category)
                .HasForeignKey(i => i.CategoryId);

            modelBuilder.Entity<Item>()
                .HasOne(item => item.Image)
                .WithOne(img => img.Item)
                .HasForeignKey<Image>(img => img.ItemId);

            modelBuilder.Entity<Image>()
                .HasOne(img => img.Item)
                .WithOne(item => item.Image)
                .HasForeignKey<Item>(item => item.ImageId);
        }
    }
}
