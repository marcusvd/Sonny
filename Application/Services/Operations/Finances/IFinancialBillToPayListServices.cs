using System.Threading.Tasks;
using Application.Services.Operations.Finances.Dtos;

namespace Application.Services.Operations.Finances
{
    public interface IFinancialBillToPayListServices
    {
        Task<FinancialBillToPayListDto> AddAsync(FinancialBillToPayListDto entityDto);
    }
}