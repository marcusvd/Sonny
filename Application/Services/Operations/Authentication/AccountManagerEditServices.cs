using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Application.Dto.Authentication;
using Application.Services.Contracts.Authentication;
using Application.Services.Helpers;

namespace Application.Services.Operations.Authentication
{

    public class AccountManagerEditServices : IAccountManagerEditServices
    {
        private readonly AuthHelpersServices _authHelpersServices;

        public AccountManagerEditServices(
        AuthHelpersServices authHelpersServices
        )
        {
             _authHelpersServices = authHelpersServices;;
        }
        public async Task<MyUserDto> GetUserByName(string userName)
        {
            var myUser = await _authHelpersServices.FindUserByNameAsync(userName);

            var myUserDto = new MyUserDto()
            {
                Id = myUser.Id,
                UserName = myUser.UserName,
                Email = myUser.Email,
                TwoFactorEnabled = await _authHelpersServices.GetTwoFactorEnabledAsync(myUser)
            };

            return myUserDto;
        }
        public async Task<MyUserDto> EditUserByName(string userName)
        {
            var myUser = await _authHelpersServices.FindUserByNameAsync(userName);

            var myUserDto = new MyUserDto()
            {
                UserName = myUser.UserName,
                Email = myUser.Email,
                TwoFactorEnabled = await _authHelpersServices.GetTwoFactorEnabledAsync(myUser)
            };

            return myUserDto;
        }

    }
}