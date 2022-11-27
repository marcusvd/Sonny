using System.Threading.Tasks;
using Services.Dto;
using Services.Dto.Financial;

namespace Services.Services.Contracts.Financial
{
    public interface ITypePaymentServices
    {
        Task<TypePaymentDto> AddAsync(TypePaymentDto record);
        Task<TypePaymentDto[]> GetAllAsync();
    }
}