
using System;
using Domain.Entities.Authentication;
using Domain.Entities.Main.Companies;

namespace Application.Services.Shared.Dtos
{
    public abstract class RootBaseDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public MyUser User { get; set; }
        public int CompanyId { get; set; }
        public Company Company { get; set; }
        public DateTime Deleted { get; set; }
        public DateTime Registered { get; set; }
    }

}