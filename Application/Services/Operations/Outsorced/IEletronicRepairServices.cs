using System.Threading.Tasks;
using Application.Dto.Outsourced;

namespace Application.Services.Operations.Outsourced
{
    public interface IElectronicRepairServices
    {
        Task<ElectronicRepairDto> AddAsync(ElectronicRepairDto record);

    }
}