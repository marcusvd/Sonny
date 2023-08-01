using System.Threading.Tasks;
using Domain.Entities.Stocks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Repository.Data.Operations.Stock;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/{controller}")]
    [AllowAnonymous]
    public class ManufacturersController : ControllerBase
    {
        private readonly IManufacturerRepository _iManufacturerRepository;
        public ManufacturersController(IManufacturerRepository IManufacturerRepository)
        {
            _iManufacturerRepository = IManufacturerRepository;
        }
        [HttpPost("PostManufacturer")]
        public async Task<string> PostManufacturer(Manufacturer model)
        {
            _iManufacturerRepository.AddAsync(model);
            if (await _iManufacturerRepository.save())
            {
                return "Deu Good";
            }

            return "Deu Bad";
        }

    }
}