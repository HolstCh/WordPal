using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WordPal.Data;
using WordPal.Models;

namespace WordPal.Services
{
    public interface IConversationDbService
    {
        Task<Conversation> GetConversationById(int id);
        Task<Conversation> CreateConversation(Conversation conversation);
        Task<IEnumerable<Conversation>> GetConversationsByUserId(int userId);

        Task<Message> PinMessage(int conversationId, int messageId);

        Task<Message> UnpinMessage(int conversationId, int messageId);

        Task<List<Message>> GetPinnedMessages(int conversationId);
    }
    public class ConversationDbService : IConversationDbService
    {
        private readonly AppDbContext _context;

        public ConversationDbService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Conversation> GetConversationById(int id)
        {
            return await _context.Conversations.Include(c => c.Messages).FirstOrDefaultAsync(c => c.Id == id);
        }

        public async Task<Conversation> CreateConversation(Conversation conversation)
        {
            _context.Conversations.Add(conversation);
            await _context.SaveChangesAsync();
            return conversation;
        }

        public async Task<IEnumerable<Conversation>> GetConversationsByUserId(int userId)
        {
            return await _context.Conversations
                                 .Where(c => c.UserId == userId)
                                 .Include(c => c.Messages)
                                 .ToListAsync();
        }

        public async Task<Message> PinMessage(int conversationId, int messageId)
        {
            var message = await _context.Messages.FirstOrDefaultAsync(m => m.Id == messageId && m.ConversationId == conversationId);
            System.Diagnostics.Debug.WriteLine($"Message fetched: {message}");
            if (message != null)
            {
                message.IsPinned = true;
                await _context.SaveChangesAsync();
                System.Diagnostics.Debug.WriteLine($"Message after pin: {message}");
            }

            return message;
        }

        public async Task<Message> UnpinMessage(int conversationId, int messageId)
        {
            var message = await _context.Messages.FirstOrDefaultAsync(m => m.Id == messageId && m.ConversationId == conversationId);

            message.IsPinned = false;
            await _context.SaveChangesAsync();

            return message;
        }

        public async Task<List<Message>> GetPinnedMessages(int conversationId)
        {
            return await _context.Messages
                .Where(m => m.ConversationId == conversationId && m.IsPinned)
                .ToListAsync();
        }
    }
}
