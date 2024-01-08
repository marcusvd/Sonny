using System;
using System.Collections.Generic;
using Application.Services.Operations.Main.Inheritances;
using Application.Services.Operations.Main.Partners.Enums;
using Application.Services.Operations.Outsourced.Dtos;
using Domain.Entities.Main;

namespace Application.Services.Operations.Main.Partners.Dtos
{
    public class PartnerDto : MainEntitiesBaseDto
    {

        public List<PaymentDataDto> PaymentsDataDto {get; set;}
        public PartnerBusinessEnumDto PartnerBusiness { get; set; }
        public List<CollectDeliverDto> CollectDeliversTransporters { get; set; }
        public virtual List<ElectronicRepairDto> ElectronicsRepairs { get; set; }
    }
}