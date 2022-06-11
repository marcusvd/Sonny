using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Services.Dto;
using Services.Services.Contracts;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/{controller}")]
    public class SeedingController : ControllerBase
    {/*
        private readonly ISonnyRepository _repo;
        public SeedingController(ISonnyRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> Seed()
        {
            try
            {




                List<SocialNetwork> MinasAr = new List<SocialNetwork>();
                MinasAr.Add(new SocialNetwork()
                {
                    Id = 1,
                    Name = "Facebook",
                    Url = "facebook.com.br/usuario"
                });
                MinasAr.Add(new SocialNetwork()
                {
                    Id = 2,
                    Name = "Instagram",
                    Url = "instagram.com.br/usuario"
                });


                Contact contactMinasAr = new Contact()
                {
                    Id = 9,
                    Email = "comercial@minasarcompressores.com.br",
                    Cel = "(31) 9-8419-4408",
                    Zap = "(31) 9-8419-4408",
                    Landline = "(31) 2551-0021",
                    socialnetworks = MinasAr
                };




                ClientEntity _clientMinasAr = new ClientEntity();
                _clientMinasAr.Id = 1;
                _clientMinasAr.Name = "Minas Ar Compressores";
                _clientMinasAr.CNPJ = "Obter";
                _clientMinasAr.Responsible = "Wellington Batista (Batista)";
                _clientMinasAr.Comments = "";
                _clientMinasAr.Assured = true;
                _clientMinasAr.ClientType = "PJ";
                _clientMinasAr.Payment = 40000;
                _clientMinasAr.AddressId = 1;
                // _clientMinasAr.ContactId = 1;
                _clientMinasAr.Contact = contactMinasAr;
                _clientMinasAr.NetWorkDevices = null;
                _clientMinasAr.ToSeach = _clientMinasAr.Name + " " + _clientMinasAr.Responsible;



                ClientEntity _clientLvsa = new ClientEntity();
                _clientLvsa.Id = 2;
                _clientLvsa.Name = "Laender & Vianna Sociedade de Advogados";
                _clientLvsa.CNPJ = "Obter";
                _clientLvsa.Responsible = "Lucas Laender";
                _clientLvsa.Comments = "";
                _clientLvsa.Assured = true;
                _clientLvsa.ClientType = "PJ";
                _clientLvsa.Payment = 28000;
                _clientLvsa.AddressId = 2;
                _clientLvsa.ContactId = 2;
                _clientLvsa.NetWorkDevices = null;
                _clientLvsa.ToSeach = _clientLvsa.Name + " " + _clientLvsa.Responsible;

                ClientEntity _clientCrs = new ClientEntity();
                _clientCrs.Id = 3;
                _clientCrs.Name = "Comercial Rosa Santos";
                _clientCrs.CNPJ = "14.302.611/0001-07";
                _clientCrs.Responsible = "Priscilla / Aline / Dora";
                _clientCrs.Comments = "";
                _clientCrs.Assured = true;
                _clientCrs.ClientType = "PJ";
                _clientCrs.Payment = 220;
                _clientCrs.AddressId = 8;
                _clientCrs.ContactId = 8;
                _clientCrs.NetWorkDevices = null;
                _clientCrs.ToSeach = _clientCrs.Name + " " + _clientCrs.Responsible;


                // BusinessBox businessBoxLvsa = new BusinessBox()
                // {
                //     Id = 1,
                //     ClientId = _clientLvsa.Id,
                //     Amount = +_clientLvsa.Payment,
                //     Today = System.DateTime.Now,
                //     InventoryId = 0

                // };

                // BusinessBox businessBoxMinas = new BusinessBox()
                // {
                //     Id = 2,
                //     ClientId = _clientMinasAr.Id,
                //     Amount = +_clientMinasAr.Payment,
                //     Today = System.DateTime.Now,
                //     InventoryId = 0

                // };
                // BusinessBox businessBoxCrs = new BusinessBox()
                // {
                //     Id = 3,
                //     ClientId = _clientCrs.Id,
                //     Amount = +_clientCrs.Payment,
                //     Today = System.DateTime.Now,
                //     InventoryId = 0

                // };

                _repo.Add(_clientLvsa);
                // _repo.Add(businessBoxLvsa);
                _repo.Add(_clientMinasAr);
                // _repo.Add(businessBoxMinas);
                _repo.Add(_clientCrs);
                // _repo.Add(businessBoxCrs);

                if (await _repo.SaveChangesAsync())
                {
                    return Ok("Seeded");
                }

            }
            catch (System.Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error: {ex.Message}");
            }
            return BadRequest();
        }



*/
    }
}