
using System.Collections.Generic;

namespace Services.Dto.Financial
{
    public class CheckingAccountDto
    {
        public int Id { get; set; }
        public string Institution { get; set; }
        public string Holder { get; set; }
        public string Agency { get; set; }
        public string ManagerName { get; set; }
        public string ManagerContact { get; set; }
        public string Account { get; set; }
        public string Pix { get; set; }
        public decimal Balance { get; set; }
        public string Typeaccount { get; set; }
        public List<CardDto> Cards { get; set; }
        public string Description { get; set; }
    }
}