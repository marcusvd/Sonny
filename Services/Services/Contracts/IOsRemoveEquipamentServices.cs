using System.Threading.Tasks;
using Repository.Data.Contracts;
using Services.Dto;

namespace Services.Services.Contracts
{
    public interface IOsRemoveEquipamentServices
    {
        Task<OsRemoveEquipamentDto> AddAsync(OsRemoveEquipamentDto record);
    }

}