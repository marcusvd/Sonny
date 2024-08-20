using System.Threading.Tasks;
using Application.Services.Operations.Authentication;
using Application.Services.Operations.Authentication.Dtos;
using Application.Services.Shared.Seed.EntitiesSeed;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [ApiController]
    [AllowAnonymous]
    [Route("api/{controller}")]
    public class SeedController : ControllerBase
    {
        private readonly SeedSonnyDbServices _seedSonnyDb;

        public SeedController(SeedSonnyDbServices seedSonnyDb)
        {
            _seedSonnyDb = seedSonnyDb;
        }

        [HttpGet("Seeding")]
        public async Task<bool> Seeding()
        {

            if (await _seedSonnyDb.CheckIfNeededSeed())
                return true;
            else
                return false;
        }


    }
}