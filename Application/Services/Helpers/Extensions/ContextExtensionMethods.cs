using System;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Configuration;
using System.Text;
using Repository.Data.Context;
using Microsoft.EntityFrameworkCore;

namespace Application.Services.Helpers.Extensions
{
    public static class ContextExtensionMethods
    {
        public static void AddContext(this IServiceCollection services, IConfiguration Configuration)
        {
            string cxStr = Configuration.GetConnectionString("SonnyDb");
            services.AddDbContext<SonnyDbContext>(db =>
              db.UseMySql(cxStr, ServerVersion.AutoDetect(cxStr), migration =>
              migration.MigrationsAssembly("Repository")));
        }
        public static void AddContextProd(this IServiceCollection services, IConfiguration Configuration)
        {
            string cxStr = Configuration.GetConnectionString("SonnyDbProd");
            services.AddDbContext<SonnyDbContext>(db =>
              db.UseMySql(cxStr, ServerVersion.AutoDetect(cxStr), migration =>
              migration.MigrationsAssembly("Repository")));
        }
    }
}