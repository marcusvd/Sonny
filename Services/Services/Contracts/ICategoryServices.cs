using System.Threading.Tasks;
using Services.Dto;
namespace Services.Services.Contracts
{
    public interface ICategoryServices 
    {
        Task<CategoryDto> AddAsync(CategoryDto record);
        Task<CategoryDto> EditAsync(int id, CategoryDto record);
        Task<bool> DeleteAsync(int id);
        Task<CategoryDto[]> GetAllAsync(bool include = false);
        Task<CategoryDto> GetByIdAsync(int id, bool include = false);
    }
}