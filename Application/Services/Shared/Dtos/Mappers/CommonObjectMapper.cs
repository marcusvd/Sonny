using System.Collections.Generic;


using Application.Services.Operations.Authentication.Dtos;
using Application.Services.Operations.Main.Companies.Dtos;
using Domain.Entities.Main.Companies;
using Domain.Entities.Authentication;
using Application.Services.Shared.Dtos;
using Domain.Entities.Shared;
using Domain.Entities.Main.Inheritances;
using Application.Services.Operations.Main.Inheritances;



namespace Application.Services.Shared.Dtos.Mappers
{
    public class CommonObjectMapper : ICommonObjectMapper
    {
        public CompanyDto CompanyMapper(Company entity)
        {
            var obj = new CompanyDto()
            {
                Id = entity.Id,
                Name = entity.Name,
                Deleted = entity.Deleted,
            };
            return obj;
        }
        public Company CompanyMapper(CompanyDto entity)
        {
            var obj = new Company()
            {
                Id = entity.Id,
                Name = entity.Name,
                Deleted = entity.Deleted,
            };
            return obj;
        }
        public List<CompanyDto> CompanyListMake(List<Company> list)
        {
            if (list == null) return null;

            var toReturn = new List<CompanyDto>();

            list.ForEach(x =>
            {
                toReturn.Add(CompanyMapper(x));
            });

            return toReturn;
        }
        public List<Company> CompanyListMake(List<CompanyDto> list)
        {
            if (list == null) return null;

            var toReturn = new List<Company>();

            list.ForEach(x =>
            {
                toReturn.Add(CompanyMapper(x));
            });

            return toReturn;
        }

        public MyUserDto MyUserMapper(MyUser entity)
        {
            var user = new MyUserDto()
            {
                Id = entity.Id,
                CompanyId = entity.CompanyId,
                UserName = entity.UserName,
                Email = entity.Email,
            };
            return user;
        }
        public MyUser MyUserMapper(MyUserDto entity)
        {
            var user = new MyUser()
            {
                Id = entity.Id,
                CompanyId = entity.CompanyId,
                UserName = entity.UserName,
                Email = entity.Email,
            };
            return user;
        }
        public List<MyUserDto> MyUserListMake(List<MyUser> list)
        {
            if (list == null) return null;

            var toReturn = new List<MyUserDto>();

            list.ForEach(x =>
            {
                toReturn.Add(MyUserMapper(x));
            });

            return toReturn;
        }
        public List<MyUser> MyUserListMake(List<MyUserDto> list)
        {
            if (list == null) return null;

            var toReturn = new List<MyUser>();

            list.ForEach(x =>
            {
                toReturn.Add(MyUserMapper(x));
            });

            return toReturn;
        }

        public List<AddressDto> AddressListMake(List<Address> list)
        {
            if (list == null) return null;

            var toReturn = new List<AddressDto>();

            list.ForEach(x =>
            {
                toReturn.Add(AddressMapper(x));
            });

            return toReturn;
        }
        public List<Address> AddressListMake(List<AddressDto> list)
        {
            if (list == null) return null;

            var toReturn = new List<Address>();

            list.ForEach(x =>
            {
                toReturn.Add(AddressMapper(x));
            });


            return toReturn;
        }
        public AddressDto AddressMapper(Address entity)
        {
            if (entity == null) return null;

            var obj = new AddressDto()
            {
                Id = entity.Id,
                CompanyId = entity.CompanyId,
                Deleted = entity.Deleted,
                Registered = entity.Registered,

                ZipCode = entity.ZipCode,
                Street = entity.Street,
                Number = entity.Number,
                District = entity.District,
                City = entity.City,
                State = entity.State,
                Complement = entity.Complement,

            };

            return obj;
        }
        public Address AddressMapper(AddressDto entity)
        {
            if (entity == null) return null;

            var obj = new Address()
            {
                Id = entity.Id,
                CompanyId = entity.CompanyId,
                Deleted = entity.Deleted,
                Registered = entity.Registered,

                ZipCode = entity.ZipCode,
                Street = entity.Street,
                Number = entity.Number,
                District = entity.District,
                City = entity.City,
                State = entity.State,
                Complement = entity.Complement,
            };

            return obj;
        }

        public List<ContactDto> ContactListMake(List<Contact> list)
        {
            if (list == null) return null;

            var toReturn = new List<ContactDto>();

            list.ForEach(x =>
            {
                toReturn.Add(ContactMapper(x));
            });

            return toReturn;
        }
        public List<Contact> ContactListMake(List<ContactDto> list)
        {
            if (list == null) return null;

            var toReturn = new List<Contact>();

            list.ForEach(x =>
            {
                toReturn.Add(ContactMapper(x));
            });


            return toReturn;
        }
        public ContactDto ContactMapper(Contact entity)
        {
            if (entity == null) return null;

            var obj = new ContactDto()
            {
                Id = entity.Id,
                CompanyId = entity.CompanyId,
                Deleted = entity.Deleted,
                Registered = entity.Registered,

                Email = entity.Email,
                Site = entity.Site,
                Cel = entity.Cel,
                Zap = entity.Zap,
                Landline = entity.Landline,
                SocialMedias = SocialNetworkListMake(entity.SocialMedias),
            };

            return obj;
        }
        public Contact ContactMapper(ContactDto entity)
        {
            if (entity == null) return null;

            var obj = new Contact()
            {
                Id = entity.Id,
                CompanyId = entity.CompanyId,
                Deleted = entity.Deleted,
                Registered = entity.Registered,

                Email = entity.Email,
                Site = entity.Site,
                Cel = entity.Cel,
                Zap = entity.Zap,
                Landline = entity.Landline,
                SocialMedias = SocialNetworkListMake(entity.SocialMedias),
            };

            return obj;
        }

        public List<SocialNetworkDto> SocialNetworkListMake(List<SocialNetwork> list)
        {
            if (list == null) return null;

            var toReturn = new List<SocialNetworkDto>();

            list.ForEach(x =>
            {
                toReturn.Add(SocialNetworkMapper(x));
            });

            return toReturn;
        }
        public List<SocialNetwork> SocialNetworkListMake(List<SocialNetworkDto> list)
        {
            if (list == null) return null;

            var toReturn = new List<SocialNetwork>();

            list.ForEach(x =>
            {
                toReturn.Add(SocialNetworkMapper(x));
            });


            return toReturn;
        }
        public SocialNetworkDto SocialNetworkMapper(SocialNetwork entity)
        {
            if (entity == null) return null;

            var obj = new SocialNetworkDto()
            {
                Id = entity.Id,
                CompanyId = entity.CompanyId,
                Deleted = entity.Deleted,
                Registered = entity.Registered,

                Name = entity.Name,
                Url = entity.Url,
                ContactId = entity.ContactId,

            };

            return obj;
        }
        public SocialNetwork SocialNetworkMapper(SocialNetworkDto entity)
        {
            if (entity == null) return null;

            var obj = new SocialNetwork()
            {
                Id = entity.Id,
                CompanyId = entity.CompanyId,
                Deleted = entity.Deleted,
                Registered = entity.Registered,

                Name = entity.Name,
                Url = entity.Url,
                ContactId = entity.ContactId,

            };

            return obj;
        }


        public List<PhysicallyMovingCostsDto> PhysicallyMovingCostsListMake(List<PhysicallyMovingCosts> list)
        {
            if (list == null) return null;

            var toReturn = new List<PhysicallyMovingCostsDto>();

            list.ForEach(x =>
            {
                toReturn.Add(PhysicallyMovingCostsMapper(x));
            });

            return toReturn;
        }
        public List<PhysicallyMovingCosts> PhysicallyMovingCostsListMake(List<PhysicallyMovingCostsDto> list)
        {
            if (list == null) return null;

            var toReturn = new List<PhysicallyMovingCosts>();

            list.ForEach(x =>
            {
                toReturn.Add(PhysicallyMovingCostsMapper(x));
            });


            return toReturn;
        }
        public PhysicallyMovingCostsDto PhysicallyMovingCostsMapper(PhysicallyMovingCosts entity)
        {
            if (entity == null) return null;

            var obj = new PhysicallyMovingCostsDto()
            {
                Id = entity.Id,
                UserId = entity.UserId,
                CompanyId = entity.CompanyId,
                Deleted = entity.Deleted,
                Registered = entity.Registered,
                Fuel = entity.Fuel,
                Apps = entity.Apps,
                PublicTransport = entity.PublicTransport,
                MotoBoy = entity.MotoBoy,

            };

            return obj;
        }
        public PhysicallyMovingCosts PhysicallyMovingCostsMapper(PhysicallyMovingCostsDto entity)
        {
            if (entity == null) return null;

            var obj = new PhysicallyMovingCosts()
            {
                Id = entity.Id,
                UserId = entity.UserId,
                CompanyId = entity.CompanyId,
                Deleted = entity.Deleted,
                Registered = entity.Registered,
                Fuel = entity.Fuel,
                Apps = entity.Apps,
                PublicTransport = entity.PublicTransport,
                MotoBoy = entity.MotoBoy,
            };

            return obj;
        }
        public PhysicallyMovingCosts PhysicallyMovingCostsUpdateMapper(PhysicallyMovingCostsDto dto, PhysicallyMovingCosts db)
        {
            if (dto == null) return null;
            if (db == null) return null;

            db.Id = dto.Id;
            db.UserId = dto.UserId;
            db.CompanyId = dto.CompanyId;

            db.Fuel = dto.Fuel;
            db.Apps = dto.Apps;
            db.PublicTransport = dto.PublicTransport;
            db.MotoBoy = dto.MotoBoy;
            return db;
        }


    }
}