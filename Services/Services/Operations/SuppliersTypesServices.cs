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
    /*
    public class SuppliersTypesServices : ISuppliersTypesServices
    {
        // private readonly ISupplierRepository _SUPPLIER_REPO;
        private readonly IMapper _MAP;
        private readonly IUnitOfWork _GENERIC_REPO;
        public SuppliersTypesServices(
                        //  ISupplierRepository SUPPLIER_REPO,
                         IUnitOfWork GENERIC_REPO,
                         IMapper MAP
                        )
        {
            // _SUPPLIER_REPO = SUPPLIER_REPO;
            _MAP = MAP;
            _GENERIC_REPO = GENERIC_REPO;
        }

       public async Task<SupplierTypePayment> GetByIdAsync(int id)
        {
            try
            {
                SupplierTypePayment records = await _GENERIC_REPO..GetByIdAsync(_id => _id.Id == id);

                return _MAP.Map<SupplierTypePaymentDto>(records);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

    }
*/
}