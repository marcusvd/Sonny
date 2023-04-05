using System.Collections.Generic;
using System.Threading.Tasks;
using Authentication.Services.Operations;
using Domain.Entities.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Application.Dto.Authentication;
using Application.Exceptions;
using Application.Services.Contracts.Authentication;
using Application.Services.Helpers;
using Application.Contracts.Authentication;
using System.IdentityModel.Tokens.Jwt;

namespace Application.Services.Operations.Authentication
{
    [Controller]
    public class AccountServices : IAccountServices
    {

        private readonly IAuthHelpersServices _iAuthHelpersServices;
        // private readonly JwtHandler _jwtHandler;
        // private readonly Email _email;
        public AccountServices(
        IAuthHelpersServices iAuthHelpersServices
        // Email email,
        // JwtHandler jwtHandler
        )
        {
            _iAuthHelpersServices = iAuthHelpersServices;
            // _email = email;
            // _jwtHandler = jwtHandler;

        }

        public async Task<MyUser> GetUserByName(string name)
        {
            var myUser = await _iAuthHelpersServices.FindUserByNameAsync(name);
            return myUser;
        }
        public async Task<List<MyUser>> GetAllUsers()
        {
            var users = await _iAuthHelpersServices.FindAllUsersAsync();
            return users;
        }
    }
}