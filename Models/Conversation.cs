namespace WordPal.Models
{
    // The Conversation class represents a conversation in the application.
    public class Conversation
    {
        // The unique identifier for the conversation.
        public int Id { get; set; }

        // The identifier of the user who owns the conversation.
        public int UserId { get; set; }

        // The date and time when the conversation started.
        public DateTime StartedAt { get; set; }

        // The date and time when the conversation ended. This is nullable, as a conversation may not have ended yet.
        public DateTime? EndedAt { get; set; }

        // A conversation can have many messages.
        public ICollection<Message> Messages { get; set; }
    }
}
