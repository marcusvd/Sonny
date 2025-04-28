using System.Threading.Tasks;
using Application.Services.Operations.RemoteCmd;
using Application.Services.Operations.RemoteCmd.Dto;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [ApiController]
    [Route("Api/[controller]")]
    [AllowAnonymous]
    public class _RD_RemoteCmdController : ControllerBase
    {
        private readonly IRemoteCmdMachineServices _remoteCmdMachineServices;
        public _RD_RemoteCmdController(IRemoteCmdMachineServices remoteCmdMachineServices)
        {
            _remoteCmdMachineServices = remoteCmdMachineServices;
        }

        [HttpPost("AddAsyncRemoteCmdMachine")]
        public async Task<IActionResult> AddAsyncRemoteCmdMachine([FromBody] RemoteCmdMachineDto entityDto)
        {
            return Ok(await _remoteCmdMachineServices.AddAsyncRemoteCmdMachine(entityDto));
        }
    }

}