using System.Collections.Generic;
using Application.Services.Operations.Finances.Dtos.Enums;
using Application.Services.Operations.Main.Companies.Dtos;

namespace Application.Services.Operations.Finances.Dtos.Bank
{
    public class BankAccountDto
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }
        public CompanyDto Company { get; set; }
        public string Holder { get; set; }
        public string Institution { get; set; }
        public string Account { get; set; }
        public string Agency { get; set; }
        public string ManagerName { get; set; }
        public string ManagerContact { get; set; }
        public decimal Balance { get; set; }
        public bool Deleted { get; set; }
        public string Description { get; set; }
        public TypeAccountEnumDto Type { get; set; }
        public List<CardDto> Cards { get; set; } = new List<CardDto>();
        public List<PixDto> Pixes { get; set; } = new List<PixDto>();

    }

}