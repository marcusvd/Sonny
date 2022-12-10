using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Services.Services.BudgetBench.Contracts;


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

        [HttpDelete("{Id:int:min(1)}")]
        public async Task<IActionResult> Delete(int Id)
        {
                bool result = await _SOLUTIONSPRICESSERVICES.DeleteAsync(Id);
                return Ok(result);
        }

    }
}