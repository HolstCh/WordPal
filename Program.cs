using System; // String, Console, Math, etc.
using System.Net.Http; // HTTPClient for HTTP requests
using System.Net.Http.Json;
using System.Text; // Encoding for text encodings
using System.Threading.Tasks; // Task for asynchronous programming 
using Newtonsoft.Json; // JsonConvert for converting to JSON objects and JSON strings
using Newtonsoft.Json.Linq;
using dotenv.net;

namespace HuggingFaceDemo
{
    class Program
    {
        static async Task Main(string[] args)
        {
            // load variables from .env file
            DotEnv.Load();     

            var hfApiKey = Environment.GetEnvironmentVariable("HF_API_KEY");
            var apiUrl = "https://api-inference.huggingface.co/models/meta-llama/Meta-Llama-3-8B-Instruct";

            using var httpClient = new HttpClient();
            httpClient.DefaultRequestHeaders.Add("Authorization", $"Bearer {hfApiKey}");

            var requestData = new { inputs = "how to make an apple pie?" };

            while (true)
            {
                try
                {
                    var response = await httpClient.PostAsJsonAsync(apiUrl, requestData);

                    if (response.IsSuccessStatusCode)
                    {
                        string responseBody = await response.Content.ReadAsStringAsync();

                        // Parse JSON using JArray from Json.NET
                        var jsonResponse = JArray.Parse(responseBody);

                        // Access and work with jsonResponse (assuming it's an array)
                        foreach (var item in jsonResponse)
                        {
                            Console.WriteLine($"Item: {item}");
                        }
                    }
                    else
                    {
                        Console.WriteLine($"HTTP Error: {response.StatusCode} - {response.ReasonPhrase}");
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Error: {ex.Message}");
                }

                // Optional: Add a delay before making the next request to avoid hitting rate limits
                await Task.Delay(5000); // 5 seconds delay (adjust as needed)
            }
        }
    }
}