

using System.Linq;
using Domain.Entities.Main.Companies;
using Repository.Data.Context;
using System.Threading.Tasks;
using System.Collections.Generic;
using Domain.Entities.Shared;

namespace Repository.Data.Operations.Seed.EntitiesSeed
{
    public class CompanySeed
    {
        private readonly SonnyDbContext _context;
        public CompanySeed(SonnyDbContext context)
        {
            _context = context;
        }
        public void NoStopTi()
        {

            List<SocialNetwork> socialMedias = new(){
                new SocialNetwork(){Name = "Instagram", Url ="marcusdias4243"},
                new SocialNetwork(){Name = "Facebook", Url ="https://www.facebook.com/marquinho.brasileiro.9"},
            };

            Company company = new Company(1, "No Stop Ti");
            company.Address = new("30285100", "Arcos", "217", "Vera Cruz", "Belo Horizonte", "MG", "");
            company.Contact = new("contato@nostopti.com.br", "www.nostopti.com.br", "31988598734", "31988598734", "3134832404", socialMedias);
            
             _context.Add(company);
        }






    }
}