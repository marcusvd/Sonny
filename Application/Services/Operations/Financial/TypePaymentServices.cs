using System;
using System.Threading.Tasks;
using AutoMapper;
using System.Collections.Generic;
using UnitOfWork.Persistence.Contracts;
using Domain.Entities.Financial;
using Application.Dto.Financial;
using Application.Services.Contracts.Financial;

namespace Application.Services.Operations.Financial
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
            _MAP = MAP;
            _GENERIC_REPO = GENERIC_REPO;
        }
        public async Task<TypePaymentDto> AddAsync(TypePaymentDto entityDto)
        {
            if (entityDto == null) throw new Exception("O objeto era nulo");

            TypePayment entityToDb = _MAP.Map<TypePayment>(entityDto);

            _GENERIC_REPO.Typespayments.AddAsync(entityToDb);

            if (await _GENERIC_REPO.save())
            {
                return _MAP.Map<TypePaymentDto>(entityToDb);
            }

            return entityDto;
        }

        public async Task<TypePaymentDto[]> GetAllAsync()
        {
            List<TypePayment> entityFromDb = await _GENERIC_REPO.Typespayments.GetAllAsync();
           
            if (entityFromDb == null) throw new Exception("O objeto era nulo");

            TypePaymentDto[] entityFromDbConverted = _MAP.Map<TypePaymentDto[]>(entityFromDb);
           
            return entityFromDbConverted;
        }
    }

}