using System.Threading.Tasks;
using Application.Services.Operations.Outsourced.Dtos;

namespace Application.Services.Operations.Outsourced
{
    public interface IElectronicRepairServices
    {
        Task<ElectronicRepairDto> AddAsync(ElectronicRepairDto record);

    }
}