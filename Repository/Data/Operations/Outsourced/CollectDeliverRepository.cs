using System.Threading.Tasks;
using Domain.Entities;
using Repository.Data.Context;
using Repository.Data.Contracts;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Collections.Generic;
using Pagination;
using System;
using System.Globalization;
using Domain.Entities.Outsourced;
using Repository.Data.Contracts.Outsourced;

namespace Repository.Data.Operations.Outsourced
{
    public class CollectDeliverRepository : Repository<CollectDeliver>, ICollectDeliverRepository
    {

        private readonly SonnyDbContext _CONTEXT;
        public CollectDeliverRepository(SonnyDbContext CONTEXT) : base(CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }

      
    }
}