using System.Threading.Tasks;
using Application.Dto;

namespace Application.Services.Contracts
{
    public interface IStockServices
    {
        Task<StockDto[]> GetAllAsync();
        Task<StockDto> AddAsync(StockDto record);

    }
}