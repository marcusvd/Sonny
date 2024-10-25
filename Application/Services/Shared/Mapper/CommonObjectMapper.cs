using Application.Services.Operations.Authentication.Dtos;
using Application.Services.Operations.Main.Companies.Dtos;
using Domain.Entities.Main.Companies;
using Domain.Entities.Authentication;


namespace Application.Services.Shared.Mapper
{
    public class CommonObjectMapper
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

    }
}