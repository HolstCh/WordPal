using Microsoft.EntityFrameworkCore;
using WordPal.Models;

namespace WordPal.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        // Models that represent tables/schemas
        public DbSet<User> Users { get; set; }
        public DbSet<Conversation> Conversations { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<MessagePair> MessagePairs { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // User configuration
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Username).IsRequired();
                entity.Property(e => e.Password).IsRequired();
                entity.Property(e => e.CreatedAt).IsRequired();
            });

            // define relationships and configure each model

            // MessagePair configuration
            modelBuilder.Entity<MessagePair>(entity =>
            {
                entity.HasOne(mp => mp.UserMessage)
                    .WithMany()
                    .HasForeignKey(mp => mp.UserMessageId)
                    .OnDelete(DeleteBehavior.Restrict);

                entity.HasOne(mp => mp.BotMessage)
                    .WithMany()
                    .HasForeignKey(mp => mp.BotMessageId)
                    .OnDelete(DeleteBehavior.Restrict);
            });
        }
    }
}
