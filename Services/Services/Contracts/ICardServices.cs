using System.Threading.Tasks;
using Services.Dto;
namespace Services.Services.Contracts
{
    public interface ICardServices
    {
        Task<CardDto> AddAsync(CardDto record);
        Task<CardDto> EditAsync(int id, CardDto record);
        Task<bool> DeleteAsync(int id);
        Task<CardDto[]> GetAllAsync(bool include = false);
        Task<CardDto> GetByIdAsync(int id, bool include = false);
    }
}