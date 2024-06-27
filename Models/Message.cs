namespace WordPal.Models
{
    public class Message
    {
        public int Id { get; set; }
        public int ConversationId { get; set; }
        public string Sender { get; set; } // "User" or "Model"
        public string Content { get; set; }
        public DateTime SentAt { get; set; }

        // navigation property to represent the many-to-one relationship with Conversation
        public Conversation Conversation { get; set; }
    }

}
