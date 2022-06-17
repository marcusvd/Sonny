using System;
using System.Collections.Generic;

namespace Domain.Entities
{
    public class ServiceBudget
    {
        public int Id { get; set; }
        public int ClientId { get; set; }
        public ClientEntity Client { get; set; }
        public string ClientProblems { get; set; }
        public string Visually { get; set; }
        public DateTime Entrydate { get; set; }
        public DateTime EntryDateOs { get; set; }
        public bool OsMake { get; set; }
        public List<SolutionPrice> SolutionsPrices { get; set; }
    }
}
