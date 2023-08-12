using Microsoft.AspNetCore.Mvc;
using Application.Services.Operations.Upload;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UploadController : ControllerBase
    {
        
        private readonly IUploadServices _iUploadServices;

        public UploadController( IUploadServices iUploadServices)
        {
            _iUploadServices = iUploadServices;
        }

        // [HttpPost("uploadImage/{userId}")]
        // public async Task<IActionResult> UploadImage(int userId)
        // {
        //     var user = await _iUploadServices.UploadImage(userId);
        //     Request.Form
        // }




    }
}
