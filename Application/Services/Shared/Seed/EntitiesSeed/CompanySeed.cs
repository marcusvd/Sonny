

using System.Linq;
using Domain.Entities.Main.Companies;
using Repository.Data.Context;
using System.Threading.Tasks;
using System.Collections.Generic;
using Domain.Entities.Shared;
using System;
using Microsoft.EntityFrameworkCore;
using UnitOfWork.Persistence.Operations;

namespace Application.Services.Shared.Seed.EntitiesSeed
{
    public class CompanySeed
    {
        private readonly IUnitOfWork _GENERIC_REPO;
        public CompanySeed(IUnitOfWork GENERIC_REPO)
        {
            _GENERIC_REPO = GENERIC_REPO;
        }
        public Company NoStopTi()
        {

            List<SocialNetwork> socialMedias = new(){
                new SocialNetwork(){Name = "Instagram", Url ="marcusdias4243"},
                new SocialNetwork(){Name = "Facebook", Url ="https://www.facebook.com/marquinho.brasileiro.9"},
            };

            Company company = new Company(1, "No Stop Ti");
            company.Address = new("30285100", "Arcos", "217", "Vera Cruz", "Belo Horizonte", "MG", "");
            company.Contact = new("contato@nostopti.com.br", "www.nostopti.com.br", "31988598734", "31988598734", "3134832404", socialMedias);

            return company;
        }

        public async void checkAndAdd()
        {
            var nsti = _GENERIC_REPO.Companies.Get().Count();

            if (nsti < 1)
            {
                 _GENERIC_REPO.Companies.Add(NoStopTi());
                  await _GENERIC_REPO.save();
            }
        }

    }
}

