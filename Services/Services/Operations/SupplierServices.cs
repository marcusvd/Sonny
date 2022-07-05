using System;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Services.Services.Contracts;
using Services.Dto;
using System.Collections.Generic;
using Repository.Data.Operations;
using Repository.Data.Contracts;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using UnitOfWork.Persistence.Contracts;

namespace Services.Services.Operations
{
    
    // public class SupplierServices : ISupplierServices
    // {
    //     // private readonly ISupplierRepository _SUPPLIER_REPO;
    //     private readonly IMapper _MAP;
    //     private readonly IUnitOfWork _GENERIC_REPO;
    //     public SupplierServices(
    //                     //  ISupplierRepository SUPPLIER_REPO,
    //                      IUnitOfWork GENERIC_REPO,
    //                      IMapper MAP
    //                     )
    //     {
    //         // _SUPPLIER_REPO = SUPPLIER_REPO;
    //         _MAP = MAP;
    //         _GENERIC_REPO = GENERIC_REPO;
    //     }
    //     public async Task<SupplierDto> AddAsync(SupplierDto record)
    //     {
    //         try
    //         {
    //             List<SupplierTypePayment> stpArray = new List<SupplierTypePayment>();
    //             SupplierTypePayment stp;

    //             record.typespayments.ForEach((TypePaymentDto Tp) =>
    //             {
    //                 stp = new SupplierTypePayment();
    //                 stp.SupplierId = record.Id;
    //                 stp.TypePaymentId = Tp.Id;
    //                 stpArray.Add(stp);
    //             });

    //             Supplier supplier = _MAP.Map<Supplier>(record);
    //             supplier.SuppliersTypesPayments = stpArray;

    //             _GENERIC_REPO.Suppliers.AddAsync(supplier);

    //             await _GENERIC_REPO.save();

    //             return _MAP.Map<SupplierDto>(supplier);
    //         }

    //         catch (Exception ex)
    //         {
    //             throw new Exception(ex.Message);
    //         }

    //     }
    //       public async Task<SupplierDto[]> GetAllAsync()
    //     {
    //        List<Supplier> record = await  _GENERIC_REPO.Suppliers.GetAllAsync();
    //         if (record == null) return null;

    //         SupplierDto[] SuppliersDto = _MAP.Map<SupplierDto[]>(record);
    //         return SuppliersDto;

    //     }

    // }

}