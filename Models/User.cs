
namespace WordPal.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public DateTime CreatedAt { get; set; }

        // nav property to represent the one-to-many relationship with Conversation
        public ICollection<Conversation> Conversations { get; set; }
    }
}
