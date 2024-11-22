using Application.Services.Operations.Main.Customers.Dtos.Mappers;
using Application.Services.Operations.Main.Partners.Dtos.Mappers;
using Application.Services.Shared.Dtos.Mappers;

namespace Application.Services.Operations.StockProduct.Dtos.Mappers
{
    public partial class StockProductObjectMapperServices : CommonObjectMapper, IStockProductObjectMapperServices
    {
        private readonly IPartnerObjectMapperServices _IPartnerObjectMapperServices;
         private readonly ICustomerObjectMapperServices _ICustomerObjectMapperServices;
        public StockProductObjectMapperServices(
                             IPartnerObjectMapperServices IPartnerObjectMapperServices,
                             ICustomerObjectMapperServices ICustomerObjectMapperServices
         )
        {
            _IPartnerObjectMapperServices = IPartnerObjectMapperServices;
             _ICustomerObjectMapperServices = ICustomerObjectMapperServices;
        }
    }
}