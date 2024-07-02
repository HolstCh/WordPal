using Microsoft.EntityFrameworkCore;
using WordPal.Models;

namespace WordPal.Data
{
    // The AppDbContext class represents the session with the database and can be used to query and save instances of your entities.
    public class AppDbContext : DbContext
    {
        // Constructor for the AppDbContext class.
        // Parameters: DbContextOptions<AppDbContext> options - options for configuring the context
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        // DbSet properties for the User, Conversation, and Message entities.
        // These represent collections of the specified entities in the context.
        public DbSet<User> Users { get; set; }
        public DbSet<Conversation> Conversations { get; set; }
        public DbSet<Message> Messages { get; set; }

        // This method is called when the model for a derived context has been initialized, but
        // before the model has been locked down and used to initialize the context.  The default
        // implementation of this method does nothing, but it can be overridden in a derived class
        // such that the model can be further configured before it is locked down.
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configuration for the User entity
            modelBuilder.Entity<User>(entity =>
            {
                // Configure the primary key for the User entity
                entity.HasKey(e => e.Id);

                // Configure the Username property to be required
                entity.Property(e => e.Username).IsRequired();

                // Configure the Password property to be required
                entity.Property(e => e.Password).IsRequired();

                // Configure the CreatedAt property to be required
                entity.Property(e => e.CreatedAt).IsRequired();
            });

        }
    }
}