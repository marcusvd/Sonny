using System.Threading.Tasks;
using Application.Dto;
using Pagination.Models;
using Services.Dto;

namespace Application.Services.Operations.Stocks
{
    public interface IStockServices
    {
        Task<StockDto[]> GetAllAsync();
        Task<StockDto> AddAsync(StockDto record);
        Task<PagedListDto<StockDto>> GetAllPagedAsync(Params parameters);
        Task<int> GetCountByCompanyIdAsync(int id);
        
    }
}