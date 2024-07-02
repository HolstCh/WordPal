using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using WordPal.Models;
using WordPal.Services;

namespace WordPal.Controllers
{
    // Defines the API controller for Conversation model operations.
    [Route("api/[controller]")]
    [ApiController]
    public class ConversationController : ControllerBase
    {
        // The service for interacting with the Conversation database.
        private readonly IConversationDbService _conversationService;

        // Constructor for the ConversationController class.
        // Parameters: IConversationDbService conversationService - the service for interacting with the Conversation database
        public ConversationController(IConversationDbService conversationService)
        {
            _conversationService = conversationService;
        }

        // API endpoint for retrieving a conversation by its ID.
        // Parameters: int id - the ID of the conversation to retrieve
        // Returns: Task<ActionResult<Conversation>> - the result of the retrieval operation
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

        // API endpoint for creating a new conversation.
        // Parameters: Conversation conversation - the conversation to create
        // Returns: Task<ActionResult<Conversation>> - the result of the create operation
        [HttpPost]
        public async Task<ActionResult<Conversation>> CreateConversation(Conversation conversation)
        {
            var createdConversation = await _conversationService.CreateConversation(conversation);
            return CreatedAtAction(nameof(GetConversation), new { id = createdConversation.Id }, createdConversation);
        }

        // API endpoint for retrieving all conversations for a specific user.
        // Parameters: int userId - the ID of the user whose conversations to retrieve
        // Returns: Task<ActionResult<IEnumerable<Conversation>>> - the list of Conversation objects for the given user
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

        // API endpoint for pinning a message in a conversation.
        // Parameters: int conversationId - the ID of the conversation, int messageId - the ID of the message to pin
        // Returns: Task<IActionResult> - the result of the pin operation
        [HttpPut("/{conversationId}/pin/{messageId}")]
        public async Task<IActionResult> PinMessage(int conversationId, int messageId)
        {
            var message = await _conversationService.PinMessage(conversationId, messageId);
            if (message == null)
            {
                return NotFound();
            }
            return Ok();
        }

        // API endpoint for unpinning a message in a conversation.
        // Parameters: int conversationId - the ID of the conversation, int messageId - the ID of the message to unpin
        // Returns: Task<IActionResult> - the result of the unpin operation
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

        // API endpoint for retrieving all pinned messages in a conversation.
        // Parameters: int conversationId - the ID of the conversation
        // Returns: Task<IActionResult> - the list of pinned Message objects in the conversation
        [HttpGet("{conversationId}/pinned")]
        public async Task<IActionResult> GetPinnedMessages(int conversationId)
        {
            var pinnedMessages = await _conversationService.GetPinnedMessages(conversationId);
            return Ok(pinnedMessages);
        }
    }
}