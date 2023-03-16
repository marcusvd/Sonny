using System;
using Domain.Entities.Authentication;
using Microsoft.AspNetCore.Identity;
using Application.Dto.Authentication;

namespace Application.Exceptions
{
    public class EmailException : ApplicationException
    {
        private readonly UserManager<MyUser> _userManager;
        public EmailException(UserManager<MyUser> userManager)
        {
            _userManager = userManager;
        }
        public EmailException(string message) : base(message)
        {

        }
        public void UserObjIsNull(MyUserDto user)
        {
            if (user == null) throw new AuthServicesException("Objeto usuário era nulo.");

        }

    }
}