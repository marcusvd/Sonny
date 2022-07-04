using Domain.Entities;
using Repository.Data.Context;
using Repository.Data.Contracts;

namespace Repository.Data.Operations
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