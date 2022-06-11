/*
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Services.Dto;
using Services.Services.Contracts;


namespace Api.Controllers
{
    [ApiController]
    [Route("api/{controller}")]
    public class ContactsController : ControllerBase
    {

        private readonly ISonnyRepository _repo;
        public ContactsController(ISonnyRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllAsync()
        {
            try
            {
                Contact[] contact = await _repo.GetAllContactAsync();
                if (contact == null) return NotFound();
                return Ok(contact);
            }
            catch (System.Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"A base de dados falhou {ex.Message}");
            }

        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetByIdAsync(int id,  bool include)
        {
            try
            {
                Contact contact = await _repo.GetContactByIdAsync(id);
                if (contact == null) return NotFound();
                return Ok(contact);
            }
            catch (System.Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"A base de dados falhou {ex.Message}");
            }

        }

    }
}
*/