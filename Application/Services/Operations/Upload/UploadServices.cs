using System.Threading.Tasks;
using Domain.Entities.Authentication;
using Microsoft.AspNetCore.Http;
using System.IO;
using Microsoft.AspNetCore.Hosting;
using System;
using System.Linq;
using Application.Services.Operations.Authentication;

namespace Application.Services.Operations.Upload
{
    public class UploadServices : IUploadServices
    {

        private readonly IAuthHelpersServices _iAuthHelpersServices;
        private readonly HttpRequest _request;
        private readonly IWebHostEnvironment _env;

        public bool Exists { get; private set; }

        // private readonly JwtHandler _jwtHandler;
        // private readonly Email _email;
        public UploadServices(
        IAuthHelpersServices iAuthHelpersServices,
        HttpRequest request,
        IWebHostEnvironment env
        // Email email,
        // JwtHandler jwtHandler
        )
        {
            _iAuthHelpersServices = iAuthHelpersServices;
            _request = request;
            _env = env;
            // _email = email;
            // _jwtHandler = jwtHandler;

        }

        public async Task<MyUser> UploadImage(int userId)
        {
            var myUser = await _iAuthHelpersServices.FindUserByIdAsync(userId);

            var file = _request.Form.Files[0];

            if (file.Length > 0)
            {
                DeleteImage(myUser.Profile.UserProfileImage);
            }

            var myUserReturn = await _iAuthHelpersServices.UserUpdateAsync(myUser);


            return myUser;

        }

        public void DeleteImage(string imageName)
        {
            var imagePath = Path.Combine(_env.ContentRootPath, @"Resources/images", imageName);

            if (File.Exists(imagePath))
            {
                File.Delete(imagePath);
            }
        }

        public async Task<string> SaveImageAsync(IFormFile imageFile)
        {
            string imageName = new String(Path.GetFileNameWithoutExtension(imageFile.FileName)
            .Take(10)
            .ToArray())
            .Replace(' ', '-');

            imageName = $"{imageName}{DateTime.Now.ToString("yymmssfff")}{Path.GetExtension(imageFile.FileName)}";

            var imagePath = Path.Combine(_env.ContentRootPath, @"Resources/images", imageName);

            using (var fileStream = new FileStream(imagePath, FileMode.Create))
            {
                    await imageFile.CopyToAsync(fileStream);
            }

            return imageName;
        }
    }
}