using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using WordPal.Models;
using WordPal.Services;

namespace WordPal.Controllers
{
    // Defines the controller for HuggingFace API queries.
    [ApiController]
    [Route("api/[controller]")]
    public class HuggingFaceController : ControllerBase
    {
        // The service for interacting with the Hugging Face API.
        private readonly IHuggingFaceApiService _huggingFaceApiService;

        // Constructor for the HuggingFaceController class.
        // Parameters: IHuggingFaceApiService huggingFaceApiService - the service for interacting with the Hugging Face API
        public HuggingFaceController(IHuggingFaceApiService huggingFaceApiService)
        {
            _huggingFaceApiService = huggingFaceApiService;
        }

        // API endpoint for generating text using the Hugging Face API.
        // Parameters: [FromBody] GenerateTextRequest request - the request to generate text from
        // Returns: Task<ActionResult<HuggingFaceResponse>> - the result of the generate operation
        [HttpPost]
        [Route("generate")]
        public async Task<ActionResult<HuggingFaceResponse>> GenerateText([FromBody] GenerateTextRequest request)
        {
            if (request == null || string.IsNullOrWhiteSpace(request.InputText))
            {
                return BadRequest("InputText is required.");
            }

            try
            {
                var generatedText = await _huggingFaceApiService.GenerateText(request.InputText);
                return Ok(generatedText);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}