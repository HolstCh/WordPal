namespace WordPal.Models
{
    public class MessagePair
    {
        public int Id { get; set; }
        public int UserMessageId { get; set; }
        public int BotMessageId { get; set; }

        public Message UserMessage { get; set; }
        public Message BotMessage { get; set; }
    }

}
