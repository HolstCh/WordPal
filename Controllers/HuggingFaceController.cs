using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using WordPal.Models;
using WordPal.Services;

namespace WordPal.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HuggingFaceController : ControllerBase
    {
        private readonly IHuggingFaceApiService _huggingFaceApiService;

        public HuggingFaceController(IHuggingFaceApiService huggingFaceApiService)
        {
            _huggingFaceApiService = huggingFaceApiService;
        }

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