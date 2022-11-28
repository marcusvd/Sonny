using System.Threading.Tasks;
using Services.Dto.Financial;

namespace Services.Services.Contracts.Financial
{
    public interface IEssentialExpenseServices
    {
        Task<EssentialExpenseDto> AddAsync(EssentialExpenseDto entityDto);
    }
}