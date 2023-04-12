using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Dto.Authentication;

namespace Application.Services.Contracts.Authentication
{
    public interface IAccountServices
    {
        Task<MyUserDto> GetUserByName(string name);
        Task<List<MyUserDto>> GetAllUsers();
        Task<MyUserDto> UpdateUserAsync(MyUserDto user);
    }
}