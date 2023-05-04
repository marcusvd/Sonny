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
using AutoMapper;

namespace Application.Services.Operations.Authentication
{
    public class AccountServices : IAccountServices
    {

        private readonly IAuthHelpersServices _iAuthHelpersServices;
        private readonly IMapper _iMapper;

        // private readonly JwtHandler _jwtHandler;
        // private readonly Email _email;
        public AccountServices(
        IAuthHelpersServices iAuthHelpersServices,
        IMapper iMapper
        )
        {
            _iAuthHelpersServices = iAuthHelpersServices;
            _iMapper = iMapper;
        }

        public async Task<MyUserDto> GetUserByNameAsync(string name)
        {
            var myUserFromDb = await _iAuthHelpersServices.FindUserByNameAsync(name);

            var myUserDtoReturn = _iMapper.Map<MyUserDto>(myUserFromDb);

            return myUserDtoReturn;
        }
        public async Task<MyUserDto> GetUserByNameAllIncludedAsync(string name)
        {
            var myUserFromDb = await _iAuthHelpersServices.FindUserByNameAllIncludedAsync(name);

            var myUserDtoReturn = _iMapper.Map<MyUserDto>(myUserFromDb);

            return myUserDtoReturn;
        }
        public async Task<MyUserDto> GetUserByIdAsync(int id)
        {
            var myUserFromDb = await _iAuthHelpersServices.FindUserByIdAsync(id);

            var myUserDtoReturn = _iMapper.Map<MyUserDto>(myUserFromDb);

            return myUserDtoReturn;
        }
        public async Task<List<MyUserDto>> GetAllUsersAsync()
        {
            var myUsersFromDb = await _iAuthHelpersServices.FindAllUsersAsync();
            var myUsersDtoReturn = _iMapper.Map<List<MyUserDto>>(myUsersFromDb);
            return myUsersDtoReturn;
        }

        public async Task<MyUserDto> UpdateUserAsync(MyUserDto user)
        {

            var myUserFromDb = await _iAuthHelpersServices.FindUserByIdAsync(user.Id);

            var toUpdate = _iMapper.Map(user, myUserFromDb);

            if (myUserFromDb.NormalizedEmail != user.Email.ToUpper())
            {
                toUpdate.EmailConfirmed = false;
            }


            var result = await _iAuthHelpersServices.UserUpdateAsync(toUpdate);
            if (user.PasswordChanged)
            {

                var resetPwd = new ResetPasswordDto()
                {
                    Password = user.Password,
                    Email = myUserFromDb.Email,
                    Token =  await _iAuthHelpersServices.GeneratePasswordResetTokenAsync(myUserFromDb)
                };

                await _iAuthHelpersServices.ResetPasswordAsync(resetPwd);
            }
            
            
            if (result.Succeeded)
            {
                var myUserUpdatedFropmDb = await _iAuthHelpersServices.FindUserByNameAsync(user.UserName);
                return _iMapper.Map<MyUserDto>(myUserUpdatedFropmDb);
            }

            return user;

        }



    }
}