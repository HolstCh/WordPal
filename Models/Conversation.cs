
namespace WordPal.Models
{
    public class Conversation
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public DateTime StartedAt { get; set; }
        public DateTime? EndedAt { get; set; }

        // one-to-many relationship with Message
        public ICollection<Message> Messages { get; set; }
    }

}
