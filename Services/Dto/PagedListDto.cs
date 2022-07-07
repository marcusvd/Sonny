using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Services.Dto
{
    public class PagedListDto<T>
    {
        public int TotalItems { get; set; }
        public int PgSize { get; set; }
        public int CurrentPg { get; set; }
        public int TotalPg { get; set; }
        public bool HasNext { get; set; }
        public bool HasPrevious { get; set; }
        public List<T> EntitiesToShow { get; set; }

    }
}
