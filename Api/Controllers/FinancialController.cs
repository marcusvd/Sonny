using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Services.Dto;
using Services.Services.Contracts;


namespace Api.Controllers
{

    [ApiController]
    [Route("api/{controller}")]
    public class FinancialController : ControllerBase
    {
        /*
        private readonly ISonnyRepository _repo;
        public FinancialController(ISonnyRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> GetTaskAsync()
        {
            try
            {
                TypePayment[] TypePayments = await _repo.GetAllTypePaymentAsync();
                if (TypePayments == null) return NotFound();
                return Ok(TypePayments);
            }
            catch (System.Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"A base de dados falhou. Error: {ex.Message}");
            }

        }







*/
    }
}