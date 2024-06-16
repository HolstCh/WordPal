using Newtonsoft.Json;

namespace WordPal.Models
{
    public class HuggingFaceResponse
    {
        // JS will convert to generatedText in frontend
        [JsonProperty("generated_text")]
        public string GeneratedText { get; set; }
    }
}
