using System.Threading.Tasks;
using Application.Dto.Outsourced;

namespace Application.Services.Contracts.Outsourced
{
    public interface IElectronicRepairServices
    {
        Task<ElectronicRepairDto> AddAsync(ElectronicRepairDto record);

    }
}