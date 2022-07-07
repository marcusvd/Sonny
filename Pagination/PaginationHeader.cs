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
        public int _TotalItems { get; set; }
        public int _PgSize { get; set; }
        public int _CurrentPg { get; set; }
        public int _TotalPg { get; set; }
        public bool _HasNext { get; set; }
        public bool _HasPrevious { get; set; }

        public PaginationHeader(int CurrentPg,
                                int pgSize,
                                int TotalPg,
                                int TotalItems,
                                bool HasNext,
                                bool HasPrevious)
        {
            _CurrentPg = CurrentPg;
            _PgSize = pgSize;
            _TotalPg = TotalPg;
            _TotalItems = TotalItems;
            _HasNext = HasNext;
            _HasPrevious = HasPrevious;
        }



    }
}