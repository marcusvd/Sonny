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
    public class ContactsServices : IContactsServices
    {
        private readonly IContactsRepository _iContactsRepository;
        private readonly IMapper _MAP;
        private readonly IUnitOfWork _GENERIC_REPO;
        public ContactsServices(
            IContactsRepository iContactsRepository,
            IMapper iMapper,
            IUnitOfWork GENERIC_REPO
        )
        {
            _iContactsRepository = iContactsRepository;
            _MAP = iMapper;
            _GENERIC_REPO = GENERIC_REPO;
        }

        public async Task<List<ContactDto>> GetAllAsync()
        {
            var getFromDb = await _iContactsRepository.GetAllAsync();

            if (getFromDb == null) throw new GlobalServicesException(GlobalErrorsMessagesException.EntityFromIdIsNull);

            return _MAP.Map<List<ContactDto>>(getFromDb);
        }

        public async Task<ContactDto> GetByIdAsync(int id)
        {
            if (id == 0) throw new GlobalServicesException(GlobalErrorsMessagesException.IdIsNull);

            var getFromDb = await _iContactsRepository.GetByIdAsync(x => x.Id == id);

            if (getFromDb == null) throw new GlobalServicesException(GlobalErrorsMessagesException.EntityFromIdIsNull);

            return _MAP.Map<ContactDto>(getFromDb);
        }
        public async Task<ContactDto> GetByIdAllIncludedAsync(int id)
        {
            if (id == 0) throw new GlobalServicesException(GlobalErrorsMessagesException.IdIsNull);

            var getFromDb = await _iContactsRepository.GetByIdAllIncludedAsync(id);

            if (getFromDb == null) throw new GlobalServicesException(GlobalErrorsMessagesException.EntityFromIdIsNull);

            return _MAP.Map<ContactDto>(getFromDb);
        }

        public async Task<ContactDto> UpdateAsync(int id, ContactDto model)
        {
            if (id != model.Id) throw new GlobalServicesException(GlobalErrorsMessagesException.IdIsDifferentFromEntityUpdate);

            var getFromDb = await _iContactsRepository.GetByIdAsync(x => x.Id == id);

            var toUpdate = _MAP.Map(model, getFromDb);

            if (getFromDb == null) throw new GlobalServicesException(GlobalErrorsMessagesException.EntityFromIdIsNull);

            _iContactsRepository.Update(toUpdate);

            if (await _GENERIC_REPO.save())
            {
                var getFromDbConvertToDto = await _iContactsRepository.GetByIdAsync(x => x.Id == toUpdate.Id);
                return _MAP.Map<ContactDto>(getFromDbConvertToDto);
            }

            return model;

        }
    }
}