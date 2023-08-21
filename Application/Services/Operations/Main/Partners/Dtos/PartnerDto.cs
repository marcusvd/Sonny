using System;
using System.Collections.Generic;
using Application.Services.Operations.Inheritances.PartnetCustomer.Dtos;
using Application.Services.Operations.Main.Partners.Enums;
using Application.Services.Operations.Outsourced.Dtos;

namespace Application.Services.Operations.Main.Partners.Dtos
{
    public class PartnerDto : MainEntitiesBaseDto
    {
        public string BusinessLine { get; set; }
        public TypePartnerEnumDto PartnerType { get; set; }
        public List<CollectDeliverDto> CollectDeliversTransporters { get; set; }
        public virtual List<ElectronicRepairDto> ElectronicsRepairs { get; set; }
    }
}