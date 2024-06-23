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
    public interface IUserDbService
    {
        Task CreateUser(string username, string password);
        Task<User> GetUserById(int userId);
        Task<User> Login(string username, string password);
    }

    public class UserDbService: IUserDbService
    {
        private readonly AppDbContext _context;
        public UserDbService(AppDbContext context)
        {
            _context = context;
        }

        public async Task CreateUser(string username, string password)
        {
            var newUser = new User
            {
                Username = username,
                Password = password,
                CreatedAt = DateTime.UtcNow
            };

            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();
        }

        public async Task<User> GetUserById(int userId)
        {
            return _context.Users.Find(userId);
        }

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
