using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Dto.Shared;
using Application.Exceptions;
using Application.Services.PersonalData.Contracts;
using AutoMapper;
using Repository.Data.PersonalData.Contracts;
using UnitOfWork.Persistence.Contracts;

namespace Application.Services.PersonalData.Operations
{
    public class AddressesServices : IAddressesServices
    {
        private readonly IAddressesRepository _iAddressesRepository;
        private readonly IMapper _MAP;
        private readonly IUnitOfWork _GENERIC_REPO;
        public AddressesServices(
            IAddressesRepository iAddressesRepository,
            IMapper iMapper,
            IUnitOfWork GENERIC_REPO
        )
        {
            _iAddressesRepository = iAddressesRepository;
            _MAP = iMapper;
            _GENERIC_REPO = GENERIC_REPO;
        }

        public async Task<List<AddressDto>> GetAllAsync()
        {
            var getFromDb = await _iAddressesRepository.GetAllAsync();

            if (getFromDb == null) throw new GlobalServicesException(GlobalErrorsMessagesException.EntityFromIdIsNull);

            return _MAP.Map<List<AddressDto>>(getFromDb);
        }

        public async Task<AddressDto> GetByIdAsync(int id)
        {
            if (id == 0) throw new GlobalServicesException(GlobalErrorsMessagesException.IdIsNull);

            var getFromDb = await _iAddressesRepository.GetByIdAsync(x => x.Id == id);

            if (getFromDb == null) throw new GlobalServicesException(GlobalErrorsMessagesException.EntityFromIdIsNull);

            return _MAP.Map<AddressDto>(getFromDb);
        }

        public async Task<AddressDto> UpdateAsync(int id, AddressDto model)
        {
            if (id != model.Id) throw new GlobalServicesException(GlobalErrorsMessagesException.IdIsDifferentFromEntityUpdate);

            var getFromDb = await _iAddressesRepository.GetByIdAsync(x => x.Id == id);

            var toUpdate = _MAP.Map(model, getFromDb);

            if (getFromDb == null) throw new GlobalServicesException(GlobalErrorsMessagesException.EntityFromIdIsNull);

            _iAddressesRepository.Update(toUpdate);

            if (await _GENERIC_REPO.save())
            {
                var getFromDbConvertToDto = await _iAddressesRepository.GetByIdAsync(x => x.Id == toUpdate.Id);
                return _MAP.Map<AddressDto>(getFromDbConvertToDto);
            }

            return model;

        }
    }
}