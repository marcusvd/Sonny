using System.Threading.Tasks;
using Services.Dto;
namespace Services.Services.Contracts
{
    public interface ICompanyService
    {
        Task<CompanyDto> AddAsync(CompanyDto record);
        Task<CompanyDto> EditAsync(int id, CompanyDto record);
        Task<bool> DeleteAsync(int id);
        Task<CompanyDto[]> GetAllAsync(bool include = false);
        Task<CompanyDto> GetByIdAsync(int id, bool include = false);
    }
}