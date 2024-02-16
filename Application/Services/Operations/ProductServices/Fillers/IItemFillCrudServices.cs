using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using Application.Services.Operations.ProductServices.Dtos.Fill;

namespace Application.Services.Operations.ProductServices
{
    public interface IItemFillCrudServices
    {
        Task<HttpStatusCode> UpdateAddItemFillAsync(int companyId, ItemDto entityDto);
        Task<List<ItemDto>> GetAllItemFill(int companyId);
    }
   
}