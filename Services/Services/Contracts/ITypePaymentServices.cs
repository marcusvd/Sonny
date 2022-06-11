using System.Threading.Tasks;
using Services.Dto;

namespace Services.Services.Contracts
{
    public interface ITypePaymentServices
    {
        Task<TypePaymentDto> AddAsync(TypePaymentDto record);
        Task<TypePaymentDto> EditAsync(int id, TypePaymentDto record);
        Task<bool> DeleteAsync(int id);
        Task<TypePaymentDto[]> GetAllAsync();
        Task<TypePaymentDto> GetByIdAsync(int id, bool include);
    }
}