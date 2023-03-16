using System.Threading.Tasks;
using Application.Dto.Outsourced;

namespace Application.Services.Contracts.Outsourced
{
    public interface IEletronicRepairServices
    {
        Task<EletronicRepairDto> AddAsync(EletronicRepairDto record);

    }
}