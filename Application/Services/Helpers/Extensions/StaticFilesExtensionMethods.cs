using System;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Configuration;
using System.Text;
using Repository.Data.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Builder;
using System.IO;
using Microsoft.Extensions.FileProviders;
using Microsoft.AspNetCore.Http;

namespace Application.Services.Helpers.Extensions
{
    public static class StaticFilesExtensionMethods
    {
        public static void UseStaticFilesExtension(this IApplicationBuilder app)
        {
            app.UseStaticFiles(new StaticFileOptions()
            {
                FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), "Resources")),
                RequestPath = new PathString("/Resources")
            });
        }
    }
}