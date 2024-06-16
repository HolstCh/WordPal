using Newtonsoft.Json;

namespace WordPal.Models
{
    public class HuggingFaceResponse
    {
        [JsonProperty("generated_text")]
        public string GeneratedText { get; set; }
    }
}
