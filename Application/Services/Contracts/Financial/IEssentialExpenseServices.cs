using System.Threading.Tasks;
using Application.Dto.Financial;

namespace Application.Services.Contracts.Financial
{
    public interface IEssentialExpenseServices
    {
        Task<EssentialExpenseDto> AddAsync(EssentialExpenseDto entityDto);
    }
}