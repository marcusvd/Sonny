using System;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Services.Dto;
using Services.Services.Contracts;
using Microsoft.AspNetCore.Http;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/{controller}")]
    public class SuppliersController : ControllerBase
    {
        private readonly ISupplierServices _SUPPLIER_SERVICES;
        private readonly IMapper _MAP;
        public SuppliersController(       
                                    ISupplierServices SUPPLIER_SERVICES,
                                        IMapper MAP)
        {
            _SUPPLIER_SERVICES = SUPPLIER_SERVICES;
            _MAP = MAP;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                SupplierDto[] Suppliers = await _SUPPLIER_SERVICES.GetAllAsync();

                if (Suppliers == null) return NotFound();
                return Ok(Suppliers);
            }
            catch (System.Exception ex)
            {
                StatusCode(StatusCodes.Status500InternalServerError, $"A base de dados falhou, error: {ex.Message}");
            }
            return BadRequest();
        }
/*

        [HttpPost]
        public async Task<IActionResult> Post(SupplierDto record)
        {
            try
            {

                SupplierDto supplierDto = await _SUPPLIER_SERVICES.AddAsync(record);

                if (supplierDto == null) return NoContent();

                return Ok(supplierDto);

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"A base de dados falhou erro: {ex.Message}");
            }

        }


        [HttpGet("{Id}")]
        public async Task<IActionResult> GetByIdAsync(int Id)
        {
            try
            {

                SupplierDto model = await _SUPPLIER_SERVICES.GetByIdAsync(Id, true);

                if (model.Id != Id) return NotFound();

                return Ok(model);

            }
            catch (System.Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"A base de dados falhou erro: {ex.Message}");
            }



        }

        [HttpPut("{Id}")]
        public async Task<IActionResult> Put(int Id, SupplierDto newRecord)
        {
 
            try
            {
                SupplierDto supplierDto = await _SUPPLIER_SERVICES.EditAsync(Id, newRecord);
                if (supplierDto == null) return NoContent();
                return Ok(supplierDto);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"A base de dados falhou, erro: {ex.Message}");
            }
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> Remove(int id)
        {

            try
            {
                SupplierDto supplier = await _SUPPLIER_SERVICES.GetByIdAsync(id, true);

                if (supplier.Id != id) return NoContent();

                if (await _SUPPLIER_SERVICES.DeleteAsync(supplier.Id))
                {
                    return Ok(new { message = "Deletado" });
                }
                else
                {
                    throw new Exception("Erro desconhecido...");
                }
            }
            catch (System.Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"A base de dados falhou, erro: {ex.Message}");
            }
        }
*/
    }
}