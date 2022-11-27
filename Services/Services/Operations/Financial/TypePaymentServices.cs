using System;
using System.Threading.Tasks;
using AutoMapper;
using System.Collections.Generic;
using UnitOfWork.Persistence.Contracts;
using Domain.Entities.Financial;
using Services.Dto.Financial;
using Repository.Data.Contracts.Financial;
using Services.Services.Contracts.Financial;

namespace Services.Services.Operations.Financial
{
    public class TypePaymentServices : ITypePaymentServices
    {
        private readonly IMapper _MAP;
        private readonly IUnitOfWork _GENERIC_REPO;
        public TypePaymentServices(
                         IUnitOfWork GENERIC_REPO,
                         IMapper MAP
                        )
        {
            // _TYPEPAY_REPO = TYPEPAY_REPO;
            _MAP = MAP;
            _GENERIC_REPO = GENERIC_REPO;
        }
        public async Task<TypePaymentDto> AddAsync(TypePaymentDto record)
        {
            try
            {

                TypePayment TypePaymentDto = _MAP.Map<TypePayment>(record);

                _GENERIC_REPO.Typespayments.AddAsync(TypePaymentDto);

                await _GENERIC_REPO.save();

                return _MAP.Map<TypePaymentDto>(TypePaymentDto);
            }

            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }

        public async Task<TypePaymentDto[]> GetAllAsync()
        {
            List<TypePayment> EntityFromDb = await _GENERIC_REPO.Typespayments.GetAllAsync();
            if (EntityFromDb == null) return null;

            TypePaymentDto[] _typePaymentDto = _MAP.Map<TypePaymentDto[]>(EntityFromDb);
            return _typePaymentDto;
        }
    }

}