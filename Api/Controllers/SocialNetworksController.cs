using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Services.Dto;
using Services.Services.Contracts;


namespace Api.Controllers
{
    [ApiController]
    [Route("api/{controller}")]
    public class SocialNetworksController : ControllerBase
    {


        private readonly ISocialNetServices _SOCIALNET_SERVICES;
        private readonly IMapper _MAP;
        public SocialNetworksController(
                                    ISocialNetServices SOCIALNET_SERVICES,
                                        IMapper MAP)
        {
            _SOCIALNET_SERVICES = SOCIALNET_SERVICES;
            _MAP = MAP;
        }

        [HttpDelete("{Id}")]
        public async Task<IActionResult> Delete(int Id)
        {
            try
            {
                bool result = await _SOCIALNET_SERVICES.DeleteAsync(Id);
                return Ok(result);
            }
            catch (System.Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"A base de dados falhou, erro: {ex.Message}");
            }
        }


    }
}