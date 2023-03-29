using System.Threading.Tasks;
using Domain.Entities.Authentication;
using Application.Dto.Authentication;

namespace Application.Services.Contracts.Upload
{
    public interface IUploadServices
    {
        Task<MyUser> UploadImage(int userId);
       
    }
}