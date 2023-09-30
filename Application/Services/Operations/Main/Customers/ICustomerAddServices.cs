using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Services.Operations.Main.Customers.Dtos;

namespace Application.Services.Operations.Main.Customers
{
    public interface ICustomerAddServices
    {
        Task<CustomerDto> AddAsync(CustomerDto entityDto);
    }
}