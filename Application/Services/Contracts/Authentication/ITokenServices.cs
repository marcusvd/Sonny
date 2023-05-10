using System.Threading.Tasks;
using Domain.Entities.Authentication;

namespace Services.Services.Contracts.Authentication
{
    public interface ITokenServices
    {
        Task<UserToken> GenerateToken(MyUser user);
    }
}
