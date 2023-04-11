using System;
using System.Text;
using Application.Services.Helpers.Extensions;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Repository.Data.Context;

namespace Api
{
    public class Startup
    {
        public IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            //services.AddControllers();
            services.ConfigsStartupProject();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Api", Version = "v1" });
                //c.ResolveConflictingActions(x => x.First());
            });

            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
            services.AddIdentity();
            services.AddDependencyInjectionIdentity();
            services.AddScopedDependencyInjection();
            services.DataProtectionTokenProviderOptions();
            services.AddScopedValidations();


            services.AddAuthorization(options =>
                options.AddPolicy("TwoFactorEnabled",
                    x => x.RequireClaim("amr", "sub")));

            services.AddJwt(Configuration);

            services.AddAuthorizeAllControllers();

            services.AddCors();
            services.AddContext(Configuration);


            services.AddHttpContextAccessor();

            // services.Configure<CookiePolicyOptions>(opt =>
            // {
            //     opt.CheckConsentNeeded = context => true;
            //     opt.MinimumSameSitePolicy = SameSiteMode.None;
            // });

            // services.ConfigureApplicationCookie(opt => 
            // opt.LoginPath = "/Home/Login"
            // );




        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Api v1"));
            }

            app.ConfigureExceptionHandler();

            app.UseCors(x => x.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

            app.UseStaticFilesExtension();

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();
            //app.UseCookiePolicy();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
