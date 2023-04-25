using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Dto.Shared;

namespace Application.Services.PersonalData.Contracts
{
    public interface IContactsServices
    {
         Task<List<ContactDto>> GetAllAsync();
         Task<ContactDto> GetByIdAsync(int id);
         Task<ContactDto> GetByIdAllIncludedAsync(int id);
         Task<ContactDto> UpdateAsync(int id, ContactDto model);
    }
}