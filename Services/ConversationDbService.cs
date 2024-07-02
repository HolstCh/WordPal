using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WordPal.Data;
using WordPal.Models;

namespace WordPal.Services
{
    // Defines the contract for a service that interacts with the Conversation model in Entity Framework/SQL Server.
    public interface IConversationDbService
    {
        // Method to retrieve a conversation from the database by its ID.
        // Parameters: int id - the ID of the conversation to retrieve
        // Returns: Task<Conversation> - the Conversation object with the given ID
        Task<Conversation> GetConversationById(int id);

        // Method to create a new conversation in the database.
        // Parameters: Conversation conversation - the conversation to create
        // Returns: Task<Conversation> - the created Conversation object
        Task<Conversation> CreateConversation(Conversation conversation);

        // Method to retrieve all conversations from the database for a specific user.
        // Parameters: int userId - the ID of the user whose conversations to retrieve
        // Returns: Task<IEnumerable<Conversation>> - the list of Conversation objects for the given user
        Task<IEnumerable<Conversation>> GetConversationsByUserId(int userId);

        // Method to pin a message in a conversation.
        // Parameters: int conversationId - the ID of the conversation, int messageId - the ID of the message to pin
        // Returns: Task<Message> - the pinned Message object
        Task<Message> PinMessage(int conversationId, int messageId);

        // Method to unpin a message in a conversation.
        // Parameters: int conversationId - the ID of the conversation, int messageId - the ID of the message to unpin
        // Returns: Task<Message> - the unpinned Message object
        Task<Message> UnpinMessage(int conversationId, int messageId);

        // Method to retrieve all pinned messages in a conversation.
        // Parameters: int conversationId - the ID of the conversation
        // Returns: Task<List<Message>> - the list of pinned Message objects in the conversation
        Task<List<Message>> GetPinnedMessages(int conversationId);
    }

    // Implementation of the IConversationDbService interface.
    public class ConversationDbService : IConversationDbService
    {
        // The DbContext object for interacting with the database.
        private readonly AppDbContext _context;

        // Constructor for the ConversationDbService class.
        // Parameters: AppDbContext context - the DbContext object for interacting with the database
        public ConversationDbService(AppDbContext context)
        {
            _context = context;
        }

        // Method to retrieve a conversation from the database by its ID.
        // Parameters: int id - the ID of the conversation to retrieve
        // Returns: Task<Conversation> - the Conversation object with the given ID
        public async Task<Conversation> GetConversationById(int id)
        {
            return await _context.Conversations.Include(c => c.Messages).FirstOrDefaultAsync(c => c.Id == id);
        }

        // Method to create a new conversation in the database.
        // Parameters: Conversation conversation - the conversation to create
        // Returns: Task<Conversation> - the created Conversation object
        public async Task<Conversation> CreateConversation(Conversation conversation)
        {
            _context.Conversations.Add(conversation);
            await _context.SaveChangesAsync();
            return conversation;
        }

        // Method to retrieve all conversations from the database for a specific user.
        // Parameters: int userId - the ID of the user whose conversations to retrieve
        // Returns: Task<IEnumerable<Conversation>> - the list of Conversation objects for the given user
        public async Task<IEnumerable<Conversation>> GetConversationsByUserId(int userId)
        {
            return await _context.Conversations
                                 .Where(c => c.UserId == userId)
                                 .Include(c => c.Messages)
                                 .ToListAsync();
        }

        // Method to pin a message in a conversation.
        // Parameters: int conversationId - the ID of the conversation, int messageId - the ID of the message to pin
        // Returns: Task<Message> - the pinned Message object
        public async Task<Message> PinMessage(int conversationId, int messageId)
        {
            var message = await _context.Messages.FirstOrDefaultAsync(m => m.Id == messageId && m.ConversationId == conversationId);
            if (message != null)
            {
                message.IsPinned = true;
                await _context.SaveChangesAsync();
            }

            return message;
        }

        // Method to unpin a message in a conversation.
        // Parameters: int conversationId - the ID of the conversation, int messageId - the ID of the message to unpin
        // Returns: Task<Message> - the unpinned Message object
        public async Task<Message> UnpinMessage(int conversationId, int messageId)
        {
            var message = await _context.Messages.FirstOrDefaultAsync(m => m.Id == messageId && m.ConversationId == conversationId);

            message.IsPinned = false;
            await _context.SaveChangesAsync();

            return message;
        }

        // Method to retrieve all pinned messages in a conversation.
        // Parameters: int conversationId - the ID of the conversation
        // Returns: Task<List<Message>> - the list of pinned Message objects in the conversation
        public async Task<List<Message>> GetPinnedMessages(int conversationId)
        {
            return await _context.Messages
                .Where(m => m.ConversationId == conversationId && m.IsPinned)
                .ToListAsync();
        }
    }
}
