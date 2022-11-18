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
    public class CustomersController : ControllerBase
    {
        private readonly ICustomerServices _CUSTOMER_SERVICES;
        public CustomersController(ICustomerServices CUSTOMER_SERVICES)
        {
            _CUSTOMER_SERVICES = CUSTOMER_SERVICES;
        }
        //paged
        [HttpGet("getAllPaged")]
        public async Task<IActionResult> GetPagedAsync([FromQuery] PgParams parameters)
        {
            try
            {
                var viewModel = await _CUSTOMER_SERVICES.GetAllPagedAsync(parameters);
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
                List<CustomerDto> models = await _CUSTOMER_SERVICES.GetAllAsync();

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
                List<CustomerDto> models = await _CUSTOMER_SERVICES.GetAllIncludedAsync();

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
                CustomerDto model = await _CUSTOMER_SERVICES.GetByIdAsync(id);
                if (model == null) return NotFound();

                return Ok(model);
            }
            catch (System.Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"A base de dados falhou. Erro: {ex.Message}");
            }


        }
        [HttpGet("GetByIdAllIncluded/{id}")]
        public async Task<IActionResult> GetByIdAllIncluded(int id)
        {
            try
            {
                CustomerDto model = await _CUSTOMER_SERVICES.GetByIdAllIncludedAsync(id);
                
                if (model == null) return NotFound();

                return Ok(model);
            }
            catch (System.Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"A base de dados falhou. Erro: {ex.Message}");
            }


        }

        [HttpPost]
        public async Task<IActionResult> Post(CustomerDto model)
        {
            try
            {
                CustomerDto record = await _CUSTOMER_SERVICES.AddAsync(model);
                if (record == null) return NoContent();

                return Ok(record);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"A base de dados falhou, erro: {ex.Message}");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, CustomerDto model)
        {
            try
            {
                CustomerDto record = await _CUSTOMER_SERVICES.EditAsync(id, model);
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
                CustomerDto record = await _CUSTOMER_SERVICES.GetByIdAsync(id);
                if (record == null) throw new Exception("O objeto era nulo.");

                if (await _CUSTOMER_SERVICES.DeleteAsync(id))
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
        //     string idOfCustomer = String.Empty;

        //     ListFiles.ForEach((item) =>
        //     {
        //         NamesOfFiles.Add(ContentDispositionHeaderValue.Parse(item.ContentDisposition).FileName.Replace('\"', ' ').Trim());
        //     });

        //     NamesOfFiles.ForEach(item =>
        //     {
        //         NamesOfFiles = item.Split('|').ToList();
        //         NamesAlready.Add(NamesOfFiles[0]);

        //         if (idOfCustomer == String.Empty)
        //         {
        //             idOfCustomer = @"resources\" + NamesOfFiles[1];
        //         }
        //     });

        //     if (!Directory.Exists(idOfCustomer))
        //     {
        //         Directory.CreateDirectory(idOfCustomer);
        //     }

        //     NamesAlready.ForEach(names =>
        //     {
        //         using (FileStream files = new FileStream(idOfCustomer + "\\" + names, FileMode.Create))
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