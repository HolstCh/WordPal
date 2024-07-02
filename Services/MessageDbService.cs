using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using WordPal.Data;
using WordPal.Models;
using WordPal.Services;

namespace WordPal.Services
{
    // Defines the contract for a service that interacts with the Message model in Entity Framework/SQL Server.
    public interface IMessageDbService
    {
        // Method to retrieve a message from the database by its ID.
        // Parameters: int id - the ID of the message to retrieve
        // Returns: Task<Message> - the Message object with the given ID
        Task<Message> GetMessageById(int id);

        // Method to create a new message in the database.
        // Parameters: Message message - the message to create
        // Returns: Task<Message> - the created Message object
        Task<Message> CreateMessage(Message message);
    }

    // Implementation of the IMessageDbService interface.
    public class MessageDbService : IMessageDbService
    {
        // The DbContext object for interacting with the database.
        private readonly AppDbContext _context;

        // Constructor for the MessageDbService class.
        // Parameters: AppDbContext context - the DbContext object for interacting with the database
        public MessageDbService(AppDbContext context)
        {
            _context = context;
        }

        // Method to retrieve a message from the database by its ID.
        // Parameters: int id - the ID of the message to retrieve
        // Returns: Task<Message> - the Message object with the given ID
        public async Task<Message> GetMessageById(int id)
        {
            return await _context.Messages.FirstOrDefaultAsync(m => m.Id == id);
        }

        // Method to create a new message in the database.
        // Parameters: Message message - the message to create
        // Returns: Task<Message> - the created Message object
        public async Task<Message> CreateMessage(Message message)
        {
            _context.Messages.Add(message);
            await _context.SaveChangesAsync();
            return message;
        }
    }
}