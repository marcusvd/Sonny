using System;
using System.Collections.Generic;
using Application.Services.Operations.Main.Customers.Dtos;
using Application.Services.Operations.Main.Partners.Dtos;
using Domain.Entities.Authentication;

namespace Application.Services.Operations.ProductServices.Dtos
{
    public class QuantityDto
    {
       public int Id { get; set; }
        public string Sn { get; set; }
        public string NfNumber { get; set; }
        public decimal CostPrice { get; set; }
        public decimal SoldPrice { get; set; }
        public DateTime EntryDate { get; set; }
        public DateTime SoldDate { get; set; }
        public DateTime WarrantyEnd { get; set; }
        public bool IsUsed { get; set; } = false;
        public bool IsTested { get; set; }
        public DateTime IsReserved { get; set; }
        public string UsedHistorical { get; set; }
        public int? CustomerId { get; set; }
        public CustomerDto Customer { get; set; }
        public int ProductId { get; set; }
        public ProductDto Product { get; set; }
        public int SupplierId { get; set; }
        public PartnerDto Supplier { get; set; }
        public int? ReservedByUserId { get; set; }
        public MyUser ReservedByUser { get; set; }


    }
}