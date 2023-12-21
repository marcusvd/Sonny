using System;
using System.Collections.Generic;
using Application.Services.Operations.Authentication.Dtos;

namespace Application.Services.Operations.BenchBudgetService.Dtos
{
    public class ServiceDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public MyUserDto User { get; set; }
        public string Comments { get; set; }
        public DateTime IsAuthorized { get; set; }
        public DateTime Finished { get; set; }
        public List<RepairDto> Repairs { get; set; }
    }
}
