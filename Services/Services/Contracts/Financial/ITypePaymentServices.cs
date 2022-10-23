using System.Threading.Tasks;
using Services.Dto;
using Services.Dto.Financial;

namespace Services.Services.Contracts.Financial
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