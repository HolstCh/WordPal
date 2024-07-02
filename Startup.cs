using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using WordPal.Services;
using WordPal.Data;

namespace WordPal
{
    // The Startup class configures services and the app's request pipeline.
    public class Startup
    {
        // Constructor for the Startup class.
        // Parameters: IConfiguration configuration - represents the configuration for the application.
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        // Property for accessing the application's configuration.
        // Returns: IConfiguration object implementing interface
        public IConfiguration Configuration { get; }

        // This method gets called by the runtime and is used to add services to the container.
        // Parameters: IServiceCollection services - to which services can be registered
        public void ConfigureServices(IServiceCollection services)
        {
            // Register the DbContext with a connection string.
            services.AddDbContext<AppDbContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

            // Register the IHuggingFaceApiService and its implementation, HuggingFaceApiService.
            services.AddHttpClient<IHuggingFaceApiService, HuggingFaceApiService>();

            // Register the IUserDbService and its implementation, UserDbService.
            services.AddScoped<IUserDbService, UserDbService>();

            // Register the IMessageDbService and its implementation, MessageDbService.
            services.AddScoped<IMessageDbService, MessageDbService>();

            // Register the IConversationDbService and its implementation, ConversationDbService.
            services.AddScoped<IConversationDbService, ConversationDbService>();

            // Add MVC services to the services container.
            services.AddControllers();
            services.AddControllersWithViews();

            // Configure static files for serving React app in production.
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "client/build";
            });
        }

        // This method gets called by the runtime and is used to configure the HTTP request pipeline.
        // Parameters: IApplicationBuilder app - to configure the application's request pipeline
        //             IWebHostEnvironment env - to provide information about the web hosting environment
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                // Enable detailed error page for development.
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // Use custom error page in production.
                app.UseExceptionHandler("/Error");

                // Use HTTP Strict Transport Security (HSTS) in production.
                app.UseHsts();
            }

            // Serve static files like images, CSS, etc.
            app.UseStaticFiles();

            // Serve static files from the SPA (React) app.
            app.UseSpaStaticFiles();

            // Enable routing.
            app.UseRouting();

            // Define the endpoints for the application.
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");

                endpoints.MapControllers();
            });

            // Configure the application to serve a Single Page Application (SPA).
            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "client"; // Specify the directory where the client (React) app is located

                if (env.IsDevelopment())
                {
                    // Configure the React development server with the npm script 'start'.
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }
}
