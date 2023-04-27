using System;
using System.IdentityModel.Tokens.Jwt;
using Application.Dto.Shared;
using Microsoft.AspNetCore.Identity;

namespace Application.Dto.Authentication
{
    public class MyUserDto
    {
        public int Id { get; set; }

        public int CompanyId { get; set; }
        public CompanyDto Company { get; set; }
        public AddressDto Address { get; set; }
        public ContactDto Contact { get; set; }
        //public bool RememberMe { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
        public bool PasswordChanged { get; set; }
        public bool TwoFactorEnabled { get; set; }

    }
}