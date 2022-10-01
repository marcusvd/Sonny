using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Services.Services.Contracts;


namespace Api.Controllers
{

    [ApiController]
    [Route("api/{controller}")]
    public class SolutionsPricesController : ControllerBase
    {
        private readonly ISolutionsPricesServices _SOLUTIONSPRICESSERVICES;
        public SolutionsPricesController(ISolutionsPricesServices SOLUTIONSPRICESSERVICES)
        {
            _SOLUTIONSPRICESSERVICES = SOLUTIONSPRICESSERVICES;
        }

        [HttpDelete("{Id}")]
        public async Task<IActionResult> Delete(int Id)
        {
            try
            {
                bool result = await _SOLUTIONSPRICESSERVICES.DeleteAsync(Id);
                return Ok(result);
            }
            catch (System.Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"A base de dados falhou, erro: {ex.Message}");
            }
        }

    }
}