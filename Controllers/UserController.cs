using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using WordPal.Models;
using WordPal.Services;

namespace WordPal.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserDbService _userService;

        public UserController(IUserDbService userService)
        {
            _userService = userService;
        }

        [HttpPost]
        [Route("create")]
        public async Task<IActionResult> CreateUser([FromBody] User user)
        {
            Console.WriteLine(user.Username, user.Password);
            Console.WriteLine("hello");
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                await _userService.CreateUser(user.Username, user.Password);
                return Ok(user);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

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
