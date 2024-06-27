using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using WordPal.Models;
using WordPal.Services;

namespace WordPal.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessageController : ControllerBase
    {
        private readonly IMessageDbService _messageService;

        public MessageController(IMessageDbService messageService)
        {
            _messageService = messageService;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Message>> GetMessage(int id)
        {
            var message = await _messageService.GetMessageById(id);
            if (message == null)
            {
                return NotFound();
            }

            return Ok(message);
        }

        [HttpPost]
        public async Task<ActionResult<Message>> CreateMessage(Message message)
        {
            var createdMessage = await _messageService.CreateMessage(message);
            return CreatedAtAction(nameof(GetMessage), new { id = createdMessage.Id }, createdMessage);
        }
    }
}
