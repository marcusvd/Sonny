using System.Threading.Tasks;
using Domain.Entities.Authentication;


namespace Application.Services.Operations.Upload
{
    public interface IUploadServices
    {
        Task<MyUser> UploadImage(int userId);
       
    }
}