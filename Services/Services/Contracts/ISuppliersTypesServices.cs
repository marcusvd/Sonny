using System.Threading.Tasks;
using Services.Dto;

namespace Services.Services.Contracts
{
    public interface ISuppliersTypesServices
    {
        // Task<SupplierTypePaymentDto> AddAsync(SupplierTypePaymentDto record);
        // Task<SupplierTypePaymentDto> EditAsync(int id, SupplierTypePaymentDto record);
        // Task<bool> DeleteAsync(int id);
        // Task<SupplierTypePaymentDto[]> GetAllAsync();
         Task<SupplierTypePaymentDto> GetByIdAsync(int id);
    }
}