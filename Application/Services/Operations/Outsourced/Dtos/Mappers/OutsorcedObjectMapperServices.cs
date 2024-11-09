using Application.Services.Operations.Main.Customers.Dtos.Mappers;
using Application.Services.Operations.Main.Partners.Dtos.Mappers;
using Application.Services.Shared.Mapper;

namespace Application.Services.Operations.Outsourced.Dtos.Mappers
{
    public partial class OutsourcedObjectMapperServices : CommonObjectMapper, IOutsourcedObjectMapperServices
    {

        private readonly IPartnerObjectMapperServices _IPartnerObjectMapperServices;
        private readonly ICustomerObjectMapperServices _ICustomerObjectMapperServices;
        public OutsourcedObjectMapperServices(
                             IPartnerObjectMapperServices IPartnerObjectMapperServices,
                            ICustomerObjectMapperServices ICustomerObjectMapperServices
         )
        {
            _IPartnerObjectMapperServices = IPartnerObjectMapperServices;
            _ICustomerObjectMapperServices = ICustomerObjectMapperServices;
        }

    }
}