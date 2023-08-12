using Domain.Entities;
using Domain.Entities.Main;
using Domain.Entities.Main.Companies;
using Repository.Data.Context;
using Repository.Data.Operations.Repository;

namespace Repository.Data.Operations.Main.Companies
{
    public class CompanyRepository : Repository<Company>,ICompanyRepository
    {
        private  SonnyDbContext _CONTEXT;
        public CompanyRepository(SonnyDbContext CONTEXT):base(CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }

     
    }
}