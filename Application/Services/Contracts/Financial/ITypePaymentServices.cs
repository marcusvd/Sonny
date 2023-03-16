using System.Threading.Tasks;
using Application.Dto.Financial;

namespace Application.Services.Contracts.Financial
{
    public interface ITypePaymentServices
    {
        Task<TypePaymentDto> AddAsync(TypePaymentDto record);
        Task<TypePaymentDto[]> GetAllAsync();
    }
}