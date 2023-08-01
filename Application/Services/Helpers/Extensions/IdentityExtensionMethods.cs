using System;
using Authentication.Services.Operations;
using Domain.Entities.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.AspNetCore.Mvc.Routing;
using Microsoft.Extensions.DependencyInjection;
using Repository.Data.Context;
using Application.Services.Contracts.Authentication;
using Application.Services.Operations.Authentication;
using Application.Contracts.Authentication;

namespace Application.Services.Helpers.Extensions
{
    public static class IdentityExtensionMethods
    {
        //time before expires token for password reset.
        public static void DataProtectionTokenProviderOptions(this IServiceCollection services)
        {
            services.Configure<DataProtectionTokenProviderOptions>(
                opt => opt.TokenLifespan = TimeSpan.FromHours(1)
            );
        }
        public static void AddAuthorizeAllControllers(this IServiceCollection services)
        {
            services.AddMvc(opt =>
            {
                var policy = new AuthorizationPolicyBuilder()
                .RequireAuthenticatedUser()
                .Build();
                opt.Filters.Add(new AuthorizeFilter(policy));
            });
        }

        public static void AddIdentity(this IServiceCollection services)
        {

            services.AddIdentity<MyUser, Role>(opt =>
             {
                 opt.SignIn.RequireConfirmedEmail = true;
                 //
                 opt.User.RequireUniqueEmail = true;
                 //
                 opt.Password.RequireDigit = false;
                 opt.Password.RequireNonAlphanumeric = false;
                 opt.Password.RequireLowercase = false;
                 opt.Password.RequireUppercase = false;
                 opt.Password.RequiredLength = 3;
                 //
                 opt.Lockout.MaxFailedAccessAttempts = 3;
                 opt.Lockout.AllowedForNewUsers = true;
             })
                .AddRoles<Role>()
                .AddEntityFrameworkStores<SonnyDbContext>()
                .AddPasswordValidator<PasswordValidatorPolicies<MyUser>>()
               .AddRoleValidator<RoleValidator<Role>>()
               .AddRoleManager<RoleManager<Role>>()
               .AddSignInManager<SignInManager<MyUser>>()
               .AddDefaultTokenProviders();
        }
        public static void AddDependencyInjectionIdentity(this IServiceCollection services)
        {
            services.AddSingleton<IActionContextAccessor, ActionContextAccessor>();
            //
            services.AddScoped<IAuthServices, AuthServices>();
            services.AddScoped<IAuthHelpersServices, AuthHelpersServices>();
            services.AddScoped<JwtHandler>();
            services.AddScoped<IUrlHelper>(x =>
          {
              var actionContext = x.GetRequiredService<IActionContextAccessor>().ActionContext;
              var factory = x.GetRequiredService<IUrlHelperFactory>();
              return factory.GetUrlHelper(actionContext);
          });

        }
    }
}