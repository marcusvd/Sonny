using System;
using System.IO;

using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Microsoft.AspNetCore.Http;
using Repository.Data.Contracts;
using Repository.Data.Operations;
using Repository.Data.Context;
using Services.Services.Operations;
using Services.Services.Contracts;
using UnitOfWork.Persistence.Contracts;
using UnitOfWork.Persistence.Operations;

namespace Api
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

            services.AddControllers().AddNewtonsoftJson(
                x => x.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
            );
            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
          
            services.AddScoped<IClientRepository, ClientRepository>();
            services.AddScoped<IClientServices, ClientServices>();

            services.AddScoped<ISocialNetworkRepository, SocialNetworkRepository>();
            services.AddScoped<ISocialNetServices, SocialNetServices>();

            services.AddScoped<IInventoryRepository, InventoryRepository>();
            services.AddScoped<IInventoryServices, InventoryServices>();

            services.AddScoped<ITypePaymentServices, TypePaymentServices>();
            services.AddScoped<ITypePaymentRepository, TypePaymentRepository>();

            services.AddScoped<IEquipamentServices, EquipamentServices>();
            services.AddScoped<IEquipamentRepository, EquipamentRepository>();

            services.AddScoped<IEletronicRepairServices, EletronicRepairServices>();
            services.AddScoped<IEletronicRepairRepository, EletronicRepairRepository>();

            services.AddScoped<ISolutionsPricesRepository, SolutionsPricesRepository>();
            services.AddScoped<ISolutionsPricesServices, SolutionsPricesServices>();

            services.AddScoped<IServiceBudgetRepository, ServiceBudgetRepository>();
            services.AddScoped<IServiceBudgetServices, ServiceBudgetServices>();
            services.AddScoped<IOsRemoveEquipamentServices, OsRemoveEquipamentServices>();
            services.AddScoped<IOsRemoveEquipamentRepository, OsRemoveEquipamentRepository>();
            

            services.AddScoped<IPartnerServices, PartnerServices>();
            services.AddScoped<ICollectDeliverServices, CollectDeliverServices>();
            services.AddScoped<ICollectDeliverRepository, CollectDeliverRepository>();
            services.AddScoped<IPartnerRepository, PartnerRepository>();

            services.AddScoped<IDailyInServices, DailyInServices>();
            services.AddScoped<IDailyInRepository, DailyInRepository>();
            services.AddScoped<IDailyOutServices, DailyOutServices>();
            services.AddScoped<IDailyOutRepository, DailyOutRepository>();

            services.AddScoped<IMonthlyOutFlowServices, MonthlyOutFlowServices>();
            services.AddScoped<IMonthlyOutFlowRepository, MonthlyOutFlowRepository>();

            services.AddScoped<ICheckingAccountServices, CheckingAccountServices>();
            services.AddScoped<ICheckingAccountRepository, CheckingAccountRepository>();

            services.AddScoped<ICompanyService, CompanyService>();
            services.AddScoped<ICompanyRepository, CompanyRepository>();

            services.AddScoped<ICardServices, CardServices>();
            services.AddScoped<ICardRepository, CardRepository>();

            services.AddScoped<IUnitOfWork, Worker>();
            services.AddCors();

            string strCnx = Configuration.GetConnectionString("SonnyDb");
            services.AddDbContext<SonnyDbContext>(_mySql => _mySql.UseMySql
            (strCnx, ServerVersion.AutoDetect(strCnx)));
            
            
            
        }
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseCors(x => x.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseStaticFiles(new StaticFileOptions()
            {
                FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), @"resources")),
                RequestPath = new PathString("/resources")
            });
            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });


        }
    }
}