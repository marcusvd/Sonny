using System;
using System.ComponentModel.DataAnnotations.Schema;
namespace Domain.Entities.Outsourced
{
    public class ChargeFrom
    {
        public int Id { get; set; }

        // [ForeignKey("PartnerId")]
        // public int? PartnerId { get; set; }
        public virtual Partner Partner { get; set; }

        // [ForeignKey("CustomerId")]
        // public int? CustomerId { get; set; }
        public virtual Customer Customer { get; set; }
       
        public bool Base { get; set; }
        public string Comments { get; set; }
    }
}
