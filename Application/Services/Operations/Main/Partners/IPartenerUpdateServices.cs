using System.Net;
using System.Threading.Tasks;
using Application.Services.Operations.Main.Customers.Dtos;
using Application.Services.Operations.Main.Partners.Dtos;

namespace Application.Services.Operations.Main.Partners
{
    public interface IPartnerUpdateServices
    {
       Task<HttpStatusCode> UpdateAsync(int partnerId, PartnerDto entity);
       Task<HttpStatusCode> DeleteFakeAsync(int partnerId);
        
    }
}