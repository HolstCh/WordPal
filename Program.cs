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
        // This method initializes a new instance of the HostBuilder with pre-configured defaults.
        // Parameters: string[] args - represents command line arguments
        // Returns: IHostBuilder - a builder for an IHost
        public static IHostBuilder CreateHostBuilder(string[] args) =>
      Host.CreateDefaultBuilder(args)
          .ConfigureWebHostDefaults(webBuilder =>
          {
              webBuilder.UseStartup<Startup>();
          });

        // The Main method is the entry point of a C# application. When the application is started, the Main method is the first method that is invoked.
        // Parameters: string[] args - represents command line arguments
        // Returns: Task - represents a task that is executing/has executed
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
                // Log the information that the application is starting up
                Log.Information("Starting up the application");

                // Create and run the web host
                CreateHostBuilder(args).Build().Run();
            }
            catch (Exception ex)
            {
                // Log the fatal error if the application fails to start correctly
                Log.Fatal(ex, "The application failed to start correctly");
            }
            finally
            {
                // Close and flush the log
                Log.CloseAndFlush();
            }
        }

    }
}