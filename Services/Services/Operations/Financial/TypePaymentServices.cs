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
        //  private readonly ITypePaymentRepository _TYPEPAY_REPO;
        private readonly IMapper _MAP;
        private readonly IUnitOfWork _GENERIC_REPO;
        public TypePaymentServices(
                          ITypePaymentRepository TYPEPAY_REPO,
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

        public async Task<TypePaymentDto> EditAsync(int id, TypePaymentDto model)
        {
            if (id != model.Id)
            {
                throw new Exception("Id para atualização não confere.");
            }

            var recordFromDb = await _GENERIC_REPO.Typespayments.GetByIdAsync(_id => _id.Id == id);


             _MAP.Map(model, recordFromDb);

            _GENERIC_REPO.Typespayments.Update(recordFromDb);

            if (await _GENERIC_REPO.save())
            {
                TypePayment TypeReturn = await _GENERIC_REPO.Typespayments.GetByIdAsync(_id => _id.Id == recordFromDb.Id);
                return _MAP.Map<TypePaymentDto>(TypeReturn);
            }

            return model;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            try
            {
                TypePayment record = await _GENERIC_REPO.Typespayments.GetByIdAsync(_id => _id.Id == id);

                if (record == null) throw new Exception("Fornecedor não encontrado para exclusão.");

                _GENERIC_REPO.Typespayments.Delete(record);

                return await _GENERIC_REPO.save();

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }

        public async Task<TypePaymentDto[]> GetAllAsync()
        {
            List<TypePayment> record = await _GENERIC_REPO.Typespayments.GetAllAsync();
            if (record == null) return null;

            TypePaymentDto[] _typePaymentDto = _MAP.Map<TypePaymentDto[]>(record);
            return _typePaymentDto;

        }

        public async Task<TypePaymentDto> GetByIdAsync(int id, bool include)
        {
           TypePayment record = await _GENERIC_REPO.Typespayments.GetByIdAsync(_id => _id.Id == id);
            if (record == null) return null;

            TypePaymentDto TypePaymentDto = _MAP.Map<TypePaymentDto>(record);
            return TypePaymentDto;
        }



    }

}