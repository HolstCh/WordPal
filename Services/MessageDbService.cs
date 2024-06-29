using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using WordPal.Data;
using WordPal.Models;
using WordPal.Services;

namespace WordPal.Services
{
    public interface IMessageDbService
    {
        Task<Message> GetMessageById(int id);
        Task<Message> CreateMessage(Message message);
    }

    public class MessageDbService : IMessageDbService
    {
        private readonly AppDbContext _context;

        public MessageDbService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Message> GetMessageById(int id)
        {
            return await _context.Messages.FirstOrDefaultAsync(m => m.Id == id);
        }

        public async Task<Message> CreateMessage(Message message)
        {
            _context.Messages.Add(message);
            await _context.SaveChangesAsync();
            return message;
        }
    }
}
