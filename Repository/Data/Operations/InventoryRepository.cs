using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Domain.Entities;
using Repository.Data.Context;
using Repository.Data.Contracts;
using System.Collections.Generic;
using Repository.Helpers;
using Pagination;

namespace Repository.Data.Operations
{

    public class InventoryRepository : Repository<Inventory>, IInventoryRepository
    {
        private readonly SonnyDbContext _CONTEXT;
        public InventoryRepository(SonnyDbContext CONTEXT) : base(CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }
    
    }

}

