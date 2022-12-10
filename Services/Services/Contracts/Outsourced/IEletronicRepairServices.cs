using System.Threading.Tasks;
using Services.Dto.Outsourced;

namespace Services.Services.Contracts.Outsourced
{
    public interface IEletronicRepairServices
    {
        Task<EletronicRepairDto> AddAsync(EletronicRepairDto record);

    }
}