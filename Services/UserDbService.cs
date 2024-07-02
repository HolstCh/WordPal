using WordPal.Models;
using WordPal.Data;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;

namespace WordPal.Services
{
    // Defines the contract for a service that interacts with the User model in Entity Framework/SQL erver.
    public interface IUserDbService
    {
        // Method to create a new user in the database.
        // Parameters: string username, string password
        // Returns: Task<User> - the created User object
        Task<User> CreateUser(string username, string password);

        // Method to retrieve a user from the database by their ID.
        // Parameters: int userId
        // Returns: Task<User> - the User object with the given ID
        Task<User> GetUserById(int userId);

        // Method to authenticate a user's login credentials.
        // Parameters: string username, string password
        // Returns: Task<User> - the User object if the credentials are valid, null otherwise
        Task<User> Login(string username, string password);
    }

    // Implementation of the IUserDbService interface.
    public class UserDbService : IUserDbService
    {
        // The DbContext object for interacting with the database.
        private readonly AppDbContext _context;

        // Constructor for the UserDbService class.
        // Parameters: AppDbContext context - the DbContext object for interacting with the database
        public UserDbService(AppDbContext context)
        {
            _context = context;
        }

        // Method to create a new user in the database.
        // Parameters: string username, string password
        // Returns: Task<User> - the created User object
        public async Task<User> CreateUser(string username, string password)
        {
            var newUser = new User
            {
                Username = username,
                Password = password,
                CreatedAt = DateTime.UtcNow
            };

            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();
            Console.WriteLine($"New User ID: {newUser.Id}");
            return newUser;
        }

        // Method to retrieve a user from the database by their ID.
        // Parameters: int userId
        // Returns: Task<User> - the User object with the given ID
        public async Task<User> GetUserById(int userId)
        {
            return _context.Users.Find(userId);
        }

        // Method to authenticate a user's login credentials.
        // Parameters: string username, string password
        // Returns: Task<User> - the User object if the credentials are valid, null otherwise
        public async Task<User> Login(string username, string password)
        {
            var user = await _context.Users.SingleOrDefaultAsync(u => u.Username == username && u.Password == password);
            if (user == null)
            {
                return null;
            }

            return user;
        }

    }
}