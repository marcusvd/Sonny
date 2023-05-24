using System.ComponentModel.DataAnnotations.Schema;
using Domain.Entities;

namespace Application.Dto.Outsourced
{
    public class ChargeFormDto
    {
        public int Id { get; set; }

        public int? PartnerId { get; set; }
        // public virtual Partner? Partner { get; set; }

        public int? CustomerId { get; set; }
        // public virtual Customer? Customer { get; set; }

        public int CollectDeliverId { get; set; }
        public virtual CollectDeliverDto CollectDeliver { get; set; }

        public bool Base { get; set; }
    }
}
