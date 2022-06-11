using System.Collections.Generic;
using System.Threading.Tasks;
using Domain.Entities;
using Repository.Contracts;

namespace Repository.Data.Contracts
{
    public interface ICategoryRepository : IRepository<Category>
    {
        Task<List<Category>> GetAllIncludedAsync();

    }



}