using System.Linq;
using System.IO;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using System.Net.Http.Headers;
using Services.Dto;
using Services.Services.Contracts;


namespace Api.Controllers
{
    [ApiController]
    [Route("api/{controller}")]
    public class EletronicsRepairsController : ControllerBase
    {
        public EletronicsRepairsController(IEletronicRepairServices ELETRONIC_REPAIR_SERVICES)
        {
            _ELETRONIC_REPAIR_SERVICES = ELETRONIC_REPAIR_SERVICES;

        }
        private readonly IEletronicRepairServices _ELETRONIC_REPAIR_SERVICES;

        // [HttpGet]
        // public async Task<IActionResult> Get()
        // {
        //     try
        //     {
        //         CollectDeliverDto[] models = await _COLLECTDELLIVER_SERVICES.GetAllAsync();

        //         if (models == null) return NotFound();

        //         return Ok(models);
        //     }
        //     catch (System.Exception ex)
        //     {
        //         return StatusCode(StatusCodes.Status500InternalServerError, $"A base de dados falhou. Erro: {ex.Message}");
        //     }

        // }

        // [HttpGet("{id}")]
        // public async Task<IActionResult> GetById(int id)
        // {
        //     try
        //     {
        //         CollectDeliverDto model = await _COLLECTDELLIVER_SERVICES.GetByIdAsync(id);
        //         if (model == null) return NotFound();

        //         return Ok(model);
        //     }
        //     catch (System.Exception ex)
        //     {
        //         return StatusCode(StatusCodes.Status500InternalServerError, $"A base de dados falhou. Erro: {ex.Message}");
        //     }


        // }

        [HttpPost]
        public async Task<IActionResult> Post(EletronicRepairDto model)
        {
            try
            {
                EletronicRepairDto record = await _ELETRONIC_REPAIR_SERVICES.AddAsync(model);
                if (record == null) return NoContent();

                return Ok(record);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"A base de dados falhou, erro: {ex.Message}");
            }
        }

        // [HttpPut("{id}")]
        // public async Task<IActionResult> Put(int id, CollectDeliverDto model)
        // {
        //     try
        //     {
        //         CollectDeliverDto record = await _COLLECTDELLIVER_SERVICES.EditAsync(id, model);
        //         if (record == null) throw new Exception("O objeto era nulo.");
        //         return Ok(record);
        //     }
        //     catch (Exception ex)
        //     {
        //         return StatusCode(StatusCodes.Status500InternalServerError, $"A base de dados falhou, erro: {ex.Message}");
        //     }

        // }

        // [HttpDelete("{id}")]
        // public async Task<IActionResult> Delete(int id)
        // {
        //     try
        //     {
        //         CollectDeliverDto record = await _COLLECTDELLIVER_SERVICES.GetByIdAsync(id);
        //         if (record == null) throw new Exception("O objeto era nulo.");

        //         if (await _COLLECTDELLIVER_SERVICES.DeleteAsync(id))
        //         {
        //             return Ok(new { message = "Registro deletado." });
        //         }

        //         return Ok(record);
        //     }
        //     catch (Exception ex)
        //     {
        //         return StatusCode(StatusCodes.Status500InternalServerError, $"A base de dados falhou, erro: {ex.Message}");
        //     }
        // }

        // [HttpPost("{upload}")]
        // public async Task<IActionResult> upload()
        // {
        //     List<IFormFile> ListFiles = Request.Form.Files.ToList();

        //     List<string> NamesOfFiles = new List<string>();
        //     List<string> NamesAlready = new List<string>();
        //     string idOfClient = String.Empty;

        //     ListFiles.ForEach((item) =>
        //     {
        //         NamesOfFiles.Add(ContentDispositionHeaderValue.Parse(item.ContentDisposition).FileName.Replace('\"', ' ').Trim());
        //     });

        //     NamesOfFiles.ForEach(item =>
        //     {
        //         NamesOfFiles = item.Split('|').ToList();
        //         NamesAlready.Add(NamesOfFiles[0]);

        //         if (idOfClient == String.Empty)
        //         {
        //             idOfClient = @"resources\" + NamesOfFiles[1];
        //         }
        //     });

        //     if (!Directory.Exists(idOfClient))
        //     {
        //         Directory.CreateDirectory(idOfClient);
        //     }

        //     NamesAlready.ForEach(names =>
        //     {
        //         using (FileStream files = new FileStream(idOfClient + "\\" + names, FileMode.Create))
        //         {
        //             ListFiles.ForEach((item) =>
        //             {
        //                 item.CopyTo(files);
        //             });
        //         }

        //     });
        //     return Ok();
        // }

    }
}