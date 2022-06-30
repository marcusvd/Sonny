using System;
using System.Collections.Generic;

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
        public AddressDto Address { get; set; }
        public int AddressId { get; set; }
        public ContactDto Contact { get; set; }
        public int ContactId { get; set; }
        public List<CollectDeliverDto> CollectsDelivers { get; set; }
        public List<DestinyCollectDeliverDto> DestinyCollectDelivers { get; set; }
        public List<SourceCollectDeliverDto> SourceCollectDelivers { get; set; }
        public string ToSeach { get; set; }
    }
}