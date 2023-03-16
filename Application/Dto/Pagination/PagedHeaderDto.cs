
using System.Collections.Generic;

namespace Services.Dto.Pagination
{
    public class PagedHeaderDto<T>
    {
        public int CurrentPg { get; set; }
        public int TotalPgs { get; set; }
        public int PgSize { get; set; }
        public int TotalCount { get; set; }
        public bool HasPrevious { get; set; }
        public bool HasNext { get; set; }
        public List<T> EntitiesToShow { get; set; }

        public PagedHeaderDto(
                    int currentPg,
                    int totalPgs,
                    int pgSize,
                    int totalCount,
                    bool hasPrevious,
                    bool hasNext,
                    List<T> entitiesToShow
                    )
        {
            CurrentPg = currentPg;
            TotalPgs = totalPgs;
            PgSize = pgSize;
            TotalCount = totalCount;
            HasPrevious = hasPrevious;
            HasNext = hasNext;
            EntitiesToShow = entitiesToShow;
        }

        // PagedHeaderDto()
        // {

        // }

    }
}