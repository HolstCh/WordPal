using WordPal.Models;
using WordPal.Data;
using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;

namespace WordPal.Services
{
    public interface IUserDbService
    {
        Task CreateUser(string username, string password);
        Task<User> GetUserById(int userId);
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

    }
}
