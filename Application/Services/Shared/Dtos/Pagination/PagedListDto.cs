using System.Collections.Generic;

namespace Application.Services.Shared.Dtos.Pagination
{
    public class PagedListDto<T>
    {
        public int CurrentPg { get; set; }
        public int TotalPgs { get; set; }
        public int PgSize { get; set; }
        public int TotalCount { get; set; }
        public bool HasPrevious { get; set; }
        public bool HasNext { get; set; }
        public List<T> EntitiesToShow { get; set; }

    }
}
