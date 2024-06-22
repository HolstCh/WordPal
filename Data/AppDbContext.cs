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

            // Define relationships and configure each model
            modelBuilder.Entity<User>()
                .HasMany(u => u.Conversations)
                .WithOne(c => c.User)
                .HasForeignKey(c => c.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Conversation>()
                .HasMany(c => c.Messages)
                .WithOne(m => m.Conversation)
                .HasForeignKey(m => m.ConversationId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<MessagePair>()
                .HasOne(mp => mp.UserMessage)
                .WithMany()
                .HasForeignKey(mp => mp.UserMessageId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<MessagePair>()
                .HasOne(mp => mp.BotMessage)
                .WithMany()
                .HasForeignKey(mp => mp.BotMessageId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
