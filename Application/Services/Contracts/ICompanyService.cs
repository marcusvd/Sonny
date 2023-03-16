using System.Threading.Tasks;
using Application.Dto;
namespace Application.Services.Contracts
{
    public interface ICompanyService
    {
        Task<CompanyDto> AddAsync(CompanyDto entityDto);
        Task<CompanyDto[]> GetAllAsync();
    }
}