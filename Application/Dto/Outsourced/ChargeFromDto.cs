using System.ComponentModel.DataAnnotations.Schema;
using Domain.Entities;

namespace Application.Dto.Outsourced
{
    public class ChargeFromDto
    {
        public int Id { get; set; }

        public virtual Partner Partner { get; set; }

        public virtual Customer Customer { get; set; }

        public bool Base { get; set; }
        public string Comments { get; set; }
    }
}
