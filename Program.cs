using System;
using System.Net.Http;
using System.Threading.Tasks;
using dotenv.net;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using Newtonsoft.Json.Linq;
using Serilog;

namespace WordPal
{
    public class Program
    {
        public static IHostBuilder CreateHostBuilder(string[] args) =>
      Host.CreateDefaultBuilder(args)
          .ConfigureWebHostDefaults(webBuilder =>
          {
              webBuilder.UseStartup<Startup>();
          });
        public static async Task Main(string[] args)
        {
            // Configure Serilog for .NET console application logs
            Log.Logger = new LoggerConfiguration()
                .MinimumLevel.Information()
                .Enrich.FromLogContext()
                .WriteTo.Console()
                .CreateLogger();

            try
            {
                Log.Information("Starting up the application");

                // Load environment variables from .env file (if using dotenv.net)
                DotEnv.Load();

                // Example usage of HttpClient to interact with API
                await UseHuggingFaceAPI();

                // Create and run the web host
                CreateHostBuilder(args).Build().Run();
            }
            catch (Exception ex)
            {
                Log.Fatal(ex, "The application failed to start correctly");
            }
            finally
            {
                Log.CloseAndFlush();
            }
        }

        static async Task UseHuggingFaceAPI()
        {
            var hfApiKey = Environment.GetEnvironmentVariable("HF_API_KEY");
            var apiUrl = "https://api-inference.huggingface.co/models/meta-llama/Meta-Llama-3-8B-Instruct";

            using var httpClient = new HttpClient();
            httpClient.DefaultRequestHeaders.Add("Authorization", $"Bearer {hfApiKey}");

            var requestData = new { inputs = "how to make an apple pie?" };
            try
            {
                var response = await httpClient.PostAsJsonAsync(apiUrl, requestData);

                if (response.IsSuccessStatusCode)
                {
                    string responseBody = await response.Content.ReadAsStringAsync();

                    // Parse JSON using JArray from Json.NET
                    var jsonResponse = JArray.Parse(responseBody);

                    Log.Information("API Response received:");

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
                Log.Error(ex, $"Error: {ex.Message}");
            }

        }
    }
}
