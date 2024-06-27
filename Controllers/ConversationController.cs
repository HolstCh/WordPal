using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using WordPal.Models;
using WordPal.Services;

namespace WordPal.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConversationController : ControllerBase
    {
        private readonly IConversationDbService _conversationService;

        public ConversationController(IConversationDbService conversationService)
        {
            _conversationService = conversationService;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Conversation>> GetConversation(int id)
        {
            var conversation = await _conversationService.GetConversationById(id);
            if (conversation == null)
            {
                return NotFound();
            }

            return Ok(conversation);
        }

        [HttpPost]
        public async Task<ActionResult<Conversation>> CreateConversation(Conversation conversation)
        {
            var createdConversation = await _conversationService.CreateConversation(conversation);
            return CreatedAtAction(nameof(GetConversation), new { id = createdConversation.Id }, createdConversation);
        }

        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<Conversation>>> GetConversationsByUserId(int userId)
        {
            var conversations = await _conversationService.GetConversationsByUserId(userId);
            if (conversations == null || !conversations.Any())
            {
                return NotFound();
            }

            return Ok(conversations);
        }
    }
}
