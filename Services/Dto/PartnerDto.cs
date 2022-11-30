using System;
using System.Collections.Generic;
using Services.Dto.CollectsDelivers;

namespace Services.Dto
{
    public class PartnerDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime Registered { get; set; }
        public string CNPJ { get; set; }
        public string Responsible { get; set; }
        public string Comments { get; set; }
        public string Businessline { get; set; }
        public AddressDto Address { get; set; }
        public ContactDto Contact { get; set; }
        public List<CollectDeliverDto> TransporterCollectDelivers { get; set; }
        public List<CollectDeliverDto> SourceCollectDelivers { get; set; }
        public List<CollectDeliverDto> DestinyCollectDelivers { get; set; }

    }
}