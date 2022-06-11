using System.Threading.Tasks;
using Services.Dto;

namespace Services.Services.Contracts
{
    public interface ISupplierServices
    {
        Task<SupplierDto> AddAsync(SupplierDto record);
     //   Task<SupplierDto> EditAsync(int id, SupplierDto record);
     //   Task<bool> DeleteAsync(int id);
        Task<SupplierDto[]> GetAllAsync();
      //  Task<SupplierDto> GetByIdAsync(int id, bool include);
    }
}