
using System.Collections.Generic;

namespace Domain.Entities
{
    public class CheckingAccount
    {
        public int Id { get; set; }
        public string Institution { get; set; }
        public string Holder { get; set; }
        public int Agency { get; set; }
        public int Account { get; set; }
        public string Pix { get; set; }
        public string Typeaccount { get; set; }
        public List<Card> Cards {get; set;}
        public string Description { get; set; }
  
    }

}