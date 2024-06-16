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
    public interface IHuggingFaceApiService
    {
        Task<HuggingFaceResponse> GenerateText(string inputText);
    }

    public class HuggingFaceApiService : IHuggingFaceApiService
    {

        private readonly HttpClient _httpClient;
        private const string apiUrl = "https://api-inference.huggingface.co/models/meta-llama/Meta-Llama-3-8B-Instruct";

        public HuggingFaceApiService(HttpClient httpClient)
        {
            DotEnv.Load();
            var hfApiKey = Environment.GetEnvironmentVariable("HF_API_KEY");
            _httpClient = httpClient;
            _httpClient.BaseAddress = new Uri(apiUrl);
            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", hfApiKey);
            Console.WriteLine("hi2");
        }

        public async Task<HuggingFaceResponse> GenerateText(string inputText)
        {
            try
            {
                Console.WriteLine("hi3");
                var payload = new { inputs = inputText };
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
