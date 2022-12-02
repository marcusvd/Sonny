using System.Collections.Generic;
using System.Threading.Tasks;
using Domain.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Services.Dto;
using Services.Services.Contracts;

// namespace Api.Controllers
// {
    // [ApiController]
    // [Route("api/{controller}")]
    // public class SeedingController : ControllerBase
    // {
    //     private readonly ISonnyRepository _repo;
    //     public SeedingController(ISonnyRepository repo)
    //     {
    //         _repo = repo;
    //     }

    //     [HttpGet]
    //     public async Task<IActionResult> Seed()
    //     {
            // new Partner()
            // {
            //     Id = 1,
            //     Name = "BaseDeTroca",

            //     Registered = System.DateTime.Now,
            //     CNPJ = "",
            //     Responsible = "Marcus Vinícius Dias",
            //     Comments = "",
            //     BusinessLine = "Desenvolvimento de softwares e supporte a redes",

            // };
            // new Partner()
//             {
//                 Id = 2,
//                 Name = "Oppen Informática",
//                 Registered = System.DateTime.Now,
//                 CNPJ = "",
//                 Responsible = "Juliano",
//                 Comments = "",
//                 BusinessLine = "FORNECEDOR HARDWARE",
//             },
//             new Partner()
//             {
//                 Id = 3,
//                 Name = "Oficina dos Bits",
//                 Registered = System.DateTime.Now,
//                 CNPJ = "",
//                 Responsible = "Claudio Nogueira",
//                 Comments = "",
//                 BusinessLine = "FORNECEDOR HARDWARE",
//             },
//             new Partner()
//             {
//                 Id = 4,
//                 Name = "Perfect print",
//                 Registered = System.DateTime.Now,
//                 CNPJ = "",
//                 Responsible = "Luiz Junior",
//                 Comments = "",
//                 BusinessLine = "Assistência técnica, aluguel e venda de periféricos e impressoras",
//             },
//             new Partner()
//             {
//                 Id = 5,
//                 Name = "Marcelinho Motoca",
//                 Registered = System.DateTime.Now,
//                 CNPJ = "",
//                 Responsible = "Marcelo Duarte",
//                 Comments = "De confiança!",
//                 BusinessLine = "Motoboy faz e desfaz qualquer treta!",
//             }
// );




//             _repo.Add(_clientLvsa);
//             // _repo.Add(businessBoxLvsa);
//             _repo.Add(_clientMinasAr);
//             // _repo.Add(businessBoxMinas);
//             _repo.Add(_clientCrs);
//             // _repo.Add(businessBoxCrs);

//             if (await _repo.SaveChangesAsync())
//             {
//                 return Ok("Seeded");
//             }


//             return BadRequest();
//         }




//     }
// }