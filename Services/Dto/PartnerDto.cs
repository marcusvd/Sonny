using System;
using System.Collections.Generic;
using Services.Dto.CollectsDelivers;

namespace Services.Dto
{
    public class PartnerDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime Today { get; set; }
        public string CNPJ { get; set; }
        public string Responsible { get; set; }
        public string Comments { get; set; }
        public string Businessline { get; set; }
        public bool Transporter { get; set; }
        public bool Supplier { get; set; }
        public AddressDto Address { get; set; }
        public int AddressId { get; set; }
        public ContactDto Contact { get; set; }
        public int ContactId { get; set; }

        public List<CollectDeliverDto> TransporterCollectDelivers { get; set; }
        public List<CollectDeliverDto> SourceCollectDelivers { get; set; }
        public List<CollectDeliverDto> DestinyCollectDelivers { get; set; }
        public string ToSeach { get; set; }
    }
}