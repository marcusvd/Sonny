

using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using Application.Services.Operations.Authentication.Dtos;
using Application.Services.Operations.Authentication.Register;
using Application.Services.Operations.Main.Companies.Dtos;
using Application.Services.Shared.Dtos.Contact;

namespace  Application.Services.Shared.Seed.EntitiesSeed
{
    public class AuthenticationSeed
    {
        private readonly IRegisterServices _iRegisterServices;
        public AuthenticationSeed(IRegisterServices iRegisterServices)
        {
            _iRegisterServices = iRegisterServices;
        }
        private CompanyDto NoStopTi()
        {

            List<SocialNetworkDto> socialMedias = new(){
                new SocialNetworkDto(){Name = "Instagram", Url ="marcusdias4243"},
                new SocialNetworkDto(){Name = "Facebook", Url ="https://www.facebook.com/marquinho.brasileiro.9"},
            };

            var company = new CompanyDto()
            {
                Id = 1,
                Name = "No Stop Ti",
                Address = new("30285100", "Arcos", "217", "Vera Cruz", "Belo Horizonte", "MG", ""),
                Contact = new("contato@nostopti.com.br", "www.nostopti.com.br", "31988598734", "31988598734", "3134832404", socialMedias)
                
            };

            return company;
        }

        public async Task<HttpStatusCode> AddUser()
        {

            var user = new MyUserDto()
            {
                Id = 1,
                Company = NoStopTi(),
                UserName = "Marcus Dias",
                Email = "marcusmvd@hotmail.com",
                Password = "123",
                ConfirmPassword = "123"
            };


            var result = await _iRegisterServices.Register(user);
            if (result.Authenticated)
                return HttpStatusCode.Created;
            else
                return HttpStatusCode.BadRequest;

        }


    }
}