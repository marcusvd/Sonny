/*{
using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Services.Dto;
using Services.Services.Contracts;


namespace Api.Controllers
{
    [ApiController]
    [Route("api/{controller}")]
    public class DevNetworkController : ControllerBase
    
        private readonly ISonnyRepository _repo;

        public DevNetworkController(ISonnyRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var getAll = await _repo.GetAllNetworkDevicesAsync();

                if (getAll == null) return NotFound();
                return Ok(getAll);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"A base de dados falhou. Erro: {e.Message}");
            }

        }


        [HttpPost]
        public async Task<IActionResult> Post(NetworkDevices entity)
        {
            try
            {
                if (entity == null)
                { return NotFound(); }
                _repo.Add(entity);
                if (await _repo.SaveChangesAsync())
                {
                    return Ok();
                }
                return BadRequest();
            }
            catch (System.Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"A base de dados falhou. Erro: {e.Message}");
            }

        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                NetworkDevices networkDevices = await _repo.GetNetworkDevicesByIdAsync(id);
                if (networkDevices == null) return NotFound();
                _repo.Delete(networkDevices);
                if (await _repo.SaveChangesAsync())
                {
                    return Ok("Deleted");
                }
            }
            catch (SystemException ex)
            {
                StatusCode(StatusCodes.Status500InternalServerError, $"A base de dados falhou erro: {ex.Message}");
            }
            return Ok(0);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                NetworkDevices networkDevices = await _repo.GetNetworkDevicesByIdAsync(id);
                if (networkDevices == null) return NotFound();
                return Ok(networkDevices);
            }
            catch (System.Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"A base de dados falhou erro: {ex.Message}");
            }
        }



    }
}
*/