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
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            // register the DbContext with a connection string
            services.AddDbContext<AppDbContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
            services.AddHttpClient<IHuggingFaceApiService, HuggingFaceApiService>();
            services.AddScoped<IUserDbService, UserDbService>();
            services.AddScoped<IMessageDbService,MessageDbService>();
            services.AddScoped<IConversationDbService, ConversationDbService>();
            services.AddControllers();
            services.AddControllersWithViews();

            // configure static files for serving React app in production
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "client/build";
            });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage(); // Enable detailed error page for development
            }
            else
            {
                app.UseExceptionHandler("/Error"); // Use custom error page in production
                app.UseHsts(); // Use HTTP Strict Transport Security (HSTS) in production
            }

           
            app.UseStaticFiles(); // Serve static files like images, CSS, etc.
            app.UseSpaStaticFiles(); // Serve static files from the SPA (React) app

            app.UseRouting(); // Enable routing

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "client"; // Specify the directory where the client (React) app is located

                if (env.IsDevelopment())
                {
                    // Configure the React development server with the npm script 'start'
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }
}