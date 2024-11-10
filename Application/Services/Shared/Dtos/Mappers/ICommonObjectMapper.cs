using System.Collections.Generic;


using Application.Services.Operations.Authentication.Dtos;
using Application.Services.Operations.Main.Companies.Dtos;
using Domain.Entities.Main.Companies;
using Domain.Entities.Authentication;
using Domain.Entities.Shared;
using Domain.Entities.Main.Inheritances;
using Application.Services.Operations.Main.Inheritances;


namespace Application.Services.Shared.Dtos.Mappers
{
    public interface ICommonObjectMapper
    {
        CompanyDto CompanyMapper(Company entity);
        Company CompanyMapper(CompanyDto entity);
        MyUserDto MyUserMapper(MyUser entity);
        MyUser MyUserMapper(MyUserDto entity);

        List<AddressDto> AddressListMake(List<Address> list);
        List<Address> AddressListMake(List<AddressDto> list);
        AddressDto AddressMapper(Address entity);
        Address AddressMapper(AddressDto entity);

        List<ContactDto> ContactListMake(List<Contact> list);
        List<Contact> ContactListMake(List<ContactDto> list);
        ContactDto ContactMapper(Contact entity);
        Contact ContactMapper(ContactDto entity);

        List<SocialNetworkDto> SocialNetworkListMake(List<SocialNetwork> list);
        List<SocialNetwork> SocialNetworkListMake(List<SocialNetworkDto> list);
        SocialNetworkDto SocialNetworkMapper(SocialNetwork entity);
        SocialNetwork SocialNetworkMapper(SocialNetworkDto entity);


        List<PhysicallyMovingCostsDto> PhysicallyMovingCostsListMake(List<PhysicallyMovingCosts> list);
        List<PhysicallyMovingCosts> PhysicallyMovingCostsListMake(List<PhysicallyMovingCostsDto> list);
        PhysicallyMovingCostsDto PhysicallyMovingCostsMapper(PhysicallyMovingCosts entity);
        PhysicallyMovingCosts PhysicallyMovingCostsMapper(PhysicallyMovingCostsDto entity);
        PhysicallyMovingCosts PhysicallyMovingCostsUpdateMapper(PhysicallyMovingCostsDto dto, PhysicallyMovingCosts db);

    }
}