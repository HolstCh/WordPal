using System.Threading.Tasks;
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
    }
}
