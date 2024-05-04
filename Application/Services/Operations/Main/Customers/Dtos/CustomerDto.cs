using System;
using System.Collections.Generic;
using Application.Services.Operations.BenchBudgetService.Dtos;
using Application.Services.Operations.Finances.Dtos;
using Application.Services.Operations.Main.Customers.Enums;
using Application.Services.Operations.Main.Inheritances;
using Application.Services.Operations.Outsourced.Dtos;
using Application.Services.Operations.ProductServices.Dtos;
using Application.Services.Shared.Dtos.Address;
using Application.Services.Shared.Dtos.Contact;
using Domain.Entities.Main.Customers;

namespace Application.Services.Operations.Main.Customers.Dtos
{
    public class CustomerDto : MainEntitiesBaseDto
    {
        public CustomerDto()
        {

        }

        // public CustomerDto(
        //                   int companyId,
        //                   string name,
        //                   string responsible,
        //                   string cnpj,
        //                   DateTime registered,
        //                   string description,
        //                   string businessLine,
        //                   AddressDto address,
        //                   ContactDto contact,
        //                   bool assured,
        //                   decimal payment,
        //                   int expiration,
        //                   bool disabled,
        //                   decimal discount,
        //                   AdditionalCostsDto additionalCosts,
        //                   EntityTypeEnumDto entityType,
        //                   PhysicallyMovingCostsDto physicallyMovingCosts
        //                       )
        // {
        //     CompanyId = companyId;
        //     Name = name;
        //     Responsible = responsible;
        //     CNPJ = cnpj;
        //     Registered = registered;
        //     Description = description;
        //     BusinessLine = businessLine;
        //     Address = address;
        //     Contact = contact;
        //     Assured = assured;
        //     Payment = payment;
        //     Expiration = expiration;
        //     Disabled = disabled;
        //     Discount = discount;
        //     AdditionalCosts = additionalCosts;
        //     EntityType = entityType;
        //     PhysicallyMovingCosts = physicallyMovingCosts;
        // }

        public bool Assured { get; set; }
        public decimal Payment { get; set; }
        public int Expiration { get; set; }
        public decimal Discount { get; set; }
        public AdditionalCostsDto AdditionalCosts { get; set; }
 
        // public List<TrackingDto> Trackings { get; set; }
        // public List<BudgetServiceDto> ServicesExecuted { get; set; }
        // public List<ElectronicRepairDto> ElectronicsRepairs { get; set; }
        // public List<FinancialExpensesNotPredictableDto> ExpensesNotPredictables { get; set; }
    }
}