using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using WordPal.Models;
using WordPal.Services;

namespace WordPal.Controllers
{
    // Defines the API controller for User model operations.
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        // The service for interacting with the User model in Entity Framework/SQL Server.
        private readonly IUserDbService _userService;

        // Constructor for the UserController class.
        // Parameters: IUserDbService userService - the service for interacting with the User database
        public UserController(IUserDbService userService)
        {
            _userService = userService;
        }

        // API endpoint for creating a new user.
        // Parameters: [FromBody] User user - the user to create
        // Returns: Task<IActionResult> - the result of the create operation
        [HttpPost]
        [Route("create")]
        public async Task<IActionResult> CreateUser([FromBody] User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                return Ok(await _userService.CreateUser(user.Username, user.Password));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // API endpoint for logging in a user.
        // Parameters: [FromBody] User user - the user to log in
        // Returns: Task<IActionResult> - the result of the login operation
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] User user)
        {
            var auth = await _userService.Login(user.Username, user.Password);
            if (auth != null)
            {
                return Ok(user);
            }
            return StatusCode(500);
        }

        // API endpoint for retrieving a user by their ID.
        // Parameters: int userId - the ID of the user to retrieve
        // Returns: Task<IActionResult> - the result of the retrieval operation
        [HttpGet]
        [Route("{userId}")]
        public async Task<IActionResult> GetUserById(int userId)
        {
            try
            {
                var user = await _userService.GetUserById(userId);
                if (user == null)
                {
                    return NotFound();
                }
                return Ok(user);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}