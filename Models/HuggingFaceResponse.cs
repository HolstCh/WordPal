using Newtonsoft.Json;

namespace WordPal.Models
{
    // The HuggingFaceResponse class represents a response from the Hugging Face API.
    public class HuggingFaceResponse
    {
        // The generated text from the Hugging Face API.
        // The JsonProperty attribute indicates that this property should be serialized/deserialized with the name 'generated_text'.
        // This is necessary because .NET typically uses PascalCase for property names while JSON typically uses snake_case.
        [JsonProperty("generated_text")]
        public string GeneratedText { get; set; }
    }
}