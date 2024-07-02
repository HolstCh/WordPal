namespace WordPal.Models
{
    // The User class represents a user in the application.
    public class User
    {
        // The unique identifier for the user.
        public int Id { get; set; }

        // The username of the user.
        public string Username { get; set; }

        // The password of the user.
        public string Password { get; set; }

        // The date and time when the user was created.
        public DateTime CreatedAt { get; set; }

        // A user can have many conversations.
        // Initialized as a new list to prevent null reference exceptions.
        public ICollection<Conversation> Conversations { get; set; } = new List<Conversation>();
    }
}