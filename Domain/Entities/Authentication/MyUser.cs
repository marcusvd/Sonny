using Domain.Entities.Outsourced;
using Domain.Entities.Profile;
using Domain.Entities.Shared;
using Domain.Entities.Stocks;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Domain.Entities.Authentication
{
    public class MyUser : IdentityUser<int>
    {
        public int CompanyId { get; set; }
        public Company Company { get; set; }
        public UserProfile Profile { get; set; }
        public Address Address { get; set; }
        public Contact Contact { get; set; }
        // public bool RememberMe { get; set; }
        public List<UserRole> UserRoles { get; set; }
        public List<Tracking> Trackings { get; set; }
        public List<Quantity> Reserveds { get; set; }
        public string Group { get; set; } = "User";
    }
}