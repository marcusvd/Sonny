using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;


namespace Pagination
{
    public class PaginationHeader
    {
        public int TotalItems { get; set; }
        public int PgSize { get; set; }
        public int CurrentPg { get; set; }
        public int TotalPg { get; set; }
        public bool HasNext { get; set; }
        public bool HasPrevious { get; set; }

        public PaginationHeader(int CurrentPg,
                                int PgSize,
                                int TotalPg,
                                int TotalItems,
                                bool HasNext,
                                bool HasPrevious)
        {
            this.CurrentPg = CurrentPg;
            this.PgSize = PgSize;
            this.TotalPg = TotalPg;
            this.TotalItems = TotalItems;
            this.HasNext = HasNext;
            this.HasPrevious = HasPrevious;
        }



    }
}