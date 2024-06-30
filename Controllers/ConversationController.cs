using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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

        [HttpPut("/{conversationId}/pin/{messageId}")]
        public async Task<IActionResult> PinMessage(int conversationId, int messageId)
        {
            System.Diagnostics.Debug.WriteLine($"Received request to pin message. ConversationId: {conversationId}, MessageId: {messageId}");
            var message = await _conversationService.PinMessage(conversationId, messageId);
            System.Diagnostics.Debug.WriteLine($"Message after pin attempt: {message}");
            System.Diagnostics.Debug.WriteLine(message);
            if (message == null)
            {
                return NotFound();
            }
            return Ok();
        }

        [HttpPut("/{conversationId}/unpin/{messageId}")]
        public async Task<IActionResult> UnpinMessage(int conversationId, int messageId)
        {
            var message = await _conversationService.UnpinMessage(conversationId, messageId);
            if (message == null)
            {
                return NotFound();
            }
            return Ok();
        }

        [HttpGet("{conversationId}/pinned")]
        public async Task<IActionResult> GetPinnedMessages(int conversationId)
        {
            var pinnedMessages = await _conversationService.GetPinnedMessages(conversationId);
            return Ok(pinnedMessages);
        }

    }
}
