using System.Threading.Tasks;
using Services.Dto;
namespace Services.Services.Contracts
{
    public interface ICompanyService
    {
        Task<CompanyDto> AddAsync(CompanyDto entityDto);
        Task<CompanyDto[]> GetAllAsync();
    }
}