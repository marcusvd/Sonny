using System.Threading.Tasks;
using Application.Dto.Authentication;

namespace Application.Services.Contracts.Authentication
{
    public interface IAccountManagerEditServices
    {
        Task<MyUserDto> GetUserByName(string userName);
    }
}