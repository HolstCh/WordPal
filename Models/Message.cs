namespace WordPal.Models
{
    // The Message class represents a message in a conversation.
    public class Message
    {
        // The unique identifier for the message.
        public int Id { get; set; }

        // The identifier of the conversation that the message belongs to.
        public int ConversationId { get; set; }

        // The sender of the message. This can be either "User" or "Model".
        public string Sender { get; set; }

        // The content of the message.
        public string Content { get; set; }

        // The date and time when the message was sent.
        public DateTime SentAt { get; set; }

        // A flag indicating whether the message is pinned.
        public bool IsPinned { get; set; }
    }
}