using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;

namespace Domain.Entities.Profile
{
    public class UserProfile
    {
        public int Id {get; set;}
        public string UserProfileImage { get; set; }
      
    }
}