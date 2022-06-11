using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Services.Dto;
using Services.Services.Contracts;
using AutoMapper;

namespace Api.Controllers
{

    [ApiController]
    [Route("api/{controller}")]
    public class TypePayController : ControllerBase
    {
       private readonly ITypePaymentServices _TYPEPAY_SERVICES;
        public TypePayController(
            ITypePaymentServices TYPEPAY_SERVICES
            )
        {
            _TYPEPAY_SERVICES = TYPEPAY_SERVICES;

        }
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                TypePaymentDto[] _typePaymentDto = await _TYPEPAY_SERVICES.GetAllAsync();
                if (_typePaymentDto == null) return NotFound();
                return Ok(_typePaymentDto);
            }
            catch (System.Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"A base de dados falhou {ex.Message}");
            }
        }
        [HttpGet("{ids}")]
        public async Task<IActionResult> Getl(int id)
        {
            try
            {
                TypePaymentDto TypePaymentDto = await _TYPEPAY_SERVICES.GetByIdAsync(id, false);
                // if (TypePaymentDto != null)
                // {
                //     ids.ToList().ForEach(_ids =>
                //     {
                //         TypePaymentDto.ToList().;
                //     })

                // }




                if (TypePaymentDto == null) return NotFound();
                return Ok(TypePaymentDto);
            }
            catch (System.Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"A base de dados falhou {ex.Message}");
            }
        }


    [HttpPost]
        public async Task<IActionResult> Post(TypePaymentDto entity)
        {
            try
            {
                TypePaymentDto Record = await _TYPEPAY_SERVICES.AddAsync(entity);

                if (Record == null) return NoContent();
                //dedicated to search field
            

                return Ok(Record);
            }
            catch (System.Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error: {ex.Message}");
            }
        }
    }
}