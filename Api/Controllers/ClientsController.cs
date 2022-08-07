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
using Pagination;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/{controller}")]
    public class ClientsController : ControllerBase
    {
        private readonly IClientServices _CLIENT_SERVICES;
        public ClientsController(IClientServices CLIENT_SERVICES)
        {
            _CLIENT_SERVICES = CLIENT_SERVICES;
        }
        //paged
        [HttpGet("getAllPaged")]
        public async Task<IActionResult> GetPagedAsync([FromQuery] PgParams parameters)
        {
            try
            {
                var viewModel = await _CLIENT_SERVICES.GetAllPagedAsync(parameters);
                if (viewModel == null) return NoContent();

                Response.AddPagination(
                    viewModel.pageIndex,
                    viewModel.pageSize,
                    viewModel.length,
                    viewModel.TotalPg,
                    viewModel.hasNextPage,
                    viewModel.hasPreviousPage
                );

                return Ok(viewModel.EntitiesToShow);

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Camada da controller: {ex.Message}");
            }
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                List<ClientDto> models = await _CLIENT_SERVICES.GetAllAsync();

                if (models == null) return NotFound();

                return Ok(models);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"A base de dados falhou. Erro: {ex.Message}");
            }

        }
        [HttpGet("GetAllIncludedAsync")]
        public async Task<IActionResult> GetAllIncludedAsync()
        {
            try
            {
                List<ClientDto> models = await _CLIENT_SERVICES.GetAllIncludedAsync();

                if (models == null) return NotFound();

                return Ok(models);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"A base de dados falhou. Erro: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                ClientDto model = await _CLIENT_SERVICES.GetByIdAsync(id);
                if (model == null) return NotFound();

                return Ok(model);
            }
            catch (System.Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"A base de dados falhou. Erro: {ex.Message}");
            }


        }

        [HttpPost]
        public async Task<IActionResult> Post(ClientDto model)
        {
            try
            {
                ClientDto record = await _CLIENT_SERVICES.AddAsync(model);
                if (record == null) return NoContent();

                return Ok(record);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"A base de dados falhou, erro: {ex.Message}");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, ClientDto model)
        {
            try
            {
                ClientDto record = await _CLIENT_SERVICES.EditAsync(id, model);
                if (record == null) throw new Exception("O objeto era nulo.");
                return Ok(record);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"A base de dados falhou, erro: {ex.Message}");
            }

        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                ClientDto record = await _CLIENT_SERVICES.GetByIdAsync(id);
                if (record == null) throw new Exception("O objeto era nulo.");

                if (await _CLIENT_SERVICES.DeleteAsync(id))
                {
                    return Ok(new { message = "Registro deletado." });
                }

                return Ok(record);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"A base de dados falhou, erro: {ex.Message}");
            }
        }

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