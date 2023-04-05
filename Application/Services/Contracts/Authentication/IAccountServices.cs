using System.Collections.Generic;
using System.Threading.Tasks;
using Domain.Entities.Authentication;
using Microsoft.AspNetCore.Identity;
using Application.Dto.Authentication;

namespace Application.Services.Contracts.Authentication
{
    public interface IAccountServices
    {
        Task<MyUser> GetUserByName(string name);
        Task<List<MyUser>> GetAllUsers();
      

    }
}