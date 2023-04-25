using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Dto.Shared;

namespace Application.Services.PersonalData.Contracts
{
    public interface IAddressesServices
    {
         Task<List<AddressDto>> GetAllAsync();
         Task<AddressDto> GetByIdAsync(int id);
         Task<AddressDto> UpdateAsync(int id, AddressDto model);
    }
}