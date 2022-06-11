using System.Threading.Tasks;
using Services.Dto;

namespace Services.Services.Contracts
{
    public interface ISocialNetServices
    {
        Task<bool> DeleteAsync(int id);
      
    }
}