using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Newtonsoft.Json;
using WordPal.Models;
using dotenv.net;
using Newtonsoft.Json.Linq;

namespace WordPal.Services
{
    // Defines the contract for a service that interacts with the Hugging Face API using HuggingFaceResponse and GenerateTextRequest models.
    public interface IHuggingFaceApiService
    {
        // Method to generate text using the Hugging Face API.
        // Parameters: string inputText - the input text to generate from
        // Returns: Task<HuggingFaceResponse> - the generated text response from the Hugging Face API
        Task<HuggingFaceResponse> GenerateText(string inputText);
    }

    // Implementation of the IHuggingFaceApiService interface.
    public class HuggingFaceApiService : IHuggingFaceApiService
    {
        // The HttpClient object for making HTTP requests.
        private readonly HttpClient _httpClient;

        // The URL of the Hugging Face API.
        private const string apiUrl = "https://api-inference.huggingface.co/models/meta-llama/Meta-Llama-3-8B-Instruct";

        // Constructor for the HuggingFaceApiService class.
        // Parameters: HttpClient httpClient - the HttpClient object for making HTTP requests
        public HuggingFaceApiService(HttpClient httpClient)
        {
            DotEnv.Load();
            var hfApiKey = Environment.GetEnvironmentVariable("HF_API_KEY");
            _httpClient = httpClient;
            _httpClient.BaseAddress = new Uri(apiUrl);
            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", hfApiKey);
        }

        // Method to generate text using the Hugging Face API.
        // Parameters: string inputText - the input text to generate text from
        // Returns: Task<HuggingFaceResponse> - the generated text response from the Hugging Face API
        public async Task<HuggingFaceResponse> GenerateText(string inputText)
        {
            try
            {
                var formattedInput = $"<|begin_of_text|><|start_header_id|>user<|end_header_id|>\n\n{inputText}<|eot_id|>";
                var payload = new
                {
                    inputs = formattedInput,
                    temperature = 0.2,
                    top_k = 50,
                    top_p = 0.9,
                    max_tokens = 10,
                };
                var response = await _httpClient.PostAsJsonAsync(apiUrl, payload);
                response.EnsureSuccessStatusCode();
                var responseBody = await response.Content.ReadAsStringAsync();
                Console.WriteLine(responseBody);
                var generatedTextResponse = JsonConvert.DeserializeObject<List<HuggingFaceResponse>>(responseBody);

                return generatedTextResponse != null && generatedTextResponse.Count > 0 ? generatedTextResponse[0] : null;
            }
            catch (Exception ex)
            {
                throw new ApplicationException("Error generating text from Hugging Face API", ex);
            }
        }
    }
}
