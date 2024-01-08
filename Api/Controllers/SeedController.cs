using System.Threading.Tasks;
using Application.Services.Operations.Authentication;
using Application.Services.Operations.Authentication.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Repository.Data.Operations.Seed;

namespace Api.Controllers
{
    [ApiController]
    [AllowAnonymous]
    [Route("api/{controller}")]
    public class SeedController : ControllerBase
    {
        private readonly SeedSonnyDb _seedSonnyDb;

        public SeedController(SeedSonnyDb seedSonnyDb)
        {
            _seedSonnyDb = seedSonnyDb;
        }

        [HttpGet("Seeding")]
        public bool Seeding()
        {
            _seedSonnyDb.CheckIfNeededSeed();
            return true;
        }


    }
}