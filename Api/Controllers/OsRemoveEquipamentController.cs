using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Services.Dto;
using Services.Services.Contracts;


namespace Api.Controllers
{
    [ApiController]
    [Route("api/{controller}")]
    public class OsRemoveEquipamentController : ControllerBase
    {/*
        private readonly ISonnyRepository _Repo;
        public OsRemoveEquipamentController(ISonnyRepository Repo)
        {
            _Repo = Repo;
        }

        [HttpPost]
        public async Task<IActionResult> Post(OsRemoveEquipament record)
        {
              
            try
            {
                if (record == null) return NotFound();
                _Repo.Add(record);
                if (await _Repo.SaveChangesAsync())
                {
                   return Created($"/api/serviceOrder/{record.Id}", record);
                }

            }
            catch (System.Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"A base de dados falhou, erro: {ex.Message}");
            }
            return BadRequest();
        }
*/
    }
}