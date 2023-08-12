using System;
using System.Collections.Generic;
using Application.Services.Operations.Inheritances.PartnetCustomer.Dtos;
using Application.Services.Operations.Outsourced.Dtos;

namespace Application.Services.Operations.Main.Partners.Dtos
{
    public class PartnerDto : MainEntitiesBaseDto
    {
        public string BusinessLine { get; set; }
        public bool Transporter { get; set; }
        public bool HardwareSupplier { get; set; }
        public bool ElectronicRepair { get; set; }
        public List<CollectDeliverDto> CollectDeliversTransporters { get; set; }
        public List<ElectronicRepairDto> ElectronicsRepairs { get; set; }
    }
}