using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using WordPal.Models;
using WordPal.Services;

namespace WordPal.Controllers
{
    // Defines the controller for Message model operations.
    [Route("api/[controller]")]
    [ApiController]
    public class MessageController : ControllerBase
    {
        // The service for interacting with the Message database.
        private readonly IMessageDbService _messageService;

        // Constructor for the MessageController class.
        // Parameters: IMessageDbService messageService - the service for interacting with the Message model in database
        public MessageController(IMessageDbService messageService)
        {
            _messageService = messageService;
        }

        // API endpoint for retrieving a message by its ID.
        // Parameters: int id - the ID of the message to retrieve
        // Returns: Task<ActionResult<Message>> - the result of the retrieval operation for a Message object
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

        // API endpoint for creating a new message.
        // Parameters: Message message - the message to create
        // Returns: Task<ActionResult<Message>> - the result of the create operation
        [HttpPost]
        public async Task<ActionResult<Message>> CreateMessage(Message message)
        {
            var createdMessage = await _messageService.CreateMessage(message);
            return CreatedAtAction(nameof(GetMessage), new { id = createdMessage.Id }, createdMessage);
        }
    }
}
