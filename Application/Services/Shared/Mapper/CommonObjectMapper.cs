using Domain.Entities.Finances.FinancingsLoansExpenses;
using Application.Services.Operations.Finances.Dtos.CategorySubcategoryExpenses;
using Application.Services.Operations.Finances.Dtos.Enums;
using Application.Services.Operations.Authentication.Dtos;
using Application.Services.Operations.Main.Companies.Dtos;
using Application.Services.Operations.Finances.Dtos.Bank;
using Application.Services.Operations.Finances.Dtos.PixExpenses;
using Domain.Entities.Main.Companies;
using Domain.Entities.Finances.CategorySubcategoryExpenses;
using Domain.Entities.Finances.Enums;
using Domain.Entities.Authentication;
using Application.Services.Operations.Finances.Dtos.FinancingsLoansExpenses;
using Domain.Entities.Finances.Bank;
using Domain.Entities.Finances.CreditCardExpenses;
using Application.Services.Operations.Finances.Dtos.CreditCardExpenses;


namespace Application.Services.Shared.Mapper
{
    public class CommonObjectMapper
    {
        public CompanyDto CompanyMapper(Company entity)
        {
            var company = new CompanyDto()
            {
                Id = entity.Id,
                Name = entity.Name,
                Deleted = entity.Deleted,
            };
            return company;
        }
        public Company CompanyMapper(CompanyDto entity)
        {
            var company = new Company()
            {
                Id = entity.Id,
                Name = entity.Name,
                Deleted = entity.Deleted,
            };
            return company;
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