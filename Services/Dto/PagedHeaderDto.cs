using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Services.Dto
{
    public class PagedHeaderDto<T>
    {
        public int CurrentPg { get; set; }
        public int TotalPg { get; set; }
        public int TotalItemsPerPg { get; set; }
        public int PgSize { get; set; }
        public int TotalItems { get; set; }
        public bool HasNext { get; set; }
        public bool HasPrevious { get; set; }
        public List<T> EntitiesToShow { get; set; }

        public PagedHeaderDto(
            int currentPg, int totalPg,
            int pgSize, int totalItems,
            bool hasNext, bool hasPrevious)
        {
            this.CurrentPg = currentPg;
            this.TotalPg = totalPg;
            this.PgSize = pgSize;
            this.TotalItems = totalItems;

        }

        PagedHeaderDto()
        {

        }

    }
}