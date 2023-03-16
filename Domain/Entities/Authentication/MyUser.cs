using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;

namespace Domain.Entities.Authentication
{
    public class MyUser : IdentityUser<int>
    {
        public int CompanyId { get; set; }
        public Company Company { get; set; }
       // public bool RememberMe { get; set; }
        public List<UserRole> UserRoles { get; set; }
        public string Group { get; set; } = "User";
    }
}