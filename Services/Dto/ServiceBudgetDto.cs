using System;
using System.Collections.Generic;

namespace Services.Dto

{
    public class ServiceBudgetDto
    {
        public int Id { get; set; }
        public int ClientId { get; set; }
        public ClientDto Client { get; set; }
        public string ClientNoRegister { get; set; }
        public string ClientProblems { get; set; }
        public string Status { get; set; }
        public string Visually { get; set; }
        public DateTime EntryDate { get; set; }
        public DateTime EntryDateOs{ get; set; }
        public bool Finished { get; set; }
        public bool OsMake {get; set;}
        public List<SolutionPriceDto> SolutionsPrices { get; set; }

    }
}
