using System.Collections.Generic;

namespace Services.Dto
{
    public class PagedListDto<T>
    {
        public int length { get; set; }
        public int pageSize { get; set; }
        public int pageIndex { get; set; }
        public bool hasNextPage { get; set; }
        public bool hasPreviousPage { get; set; }
        public List<T> EntitiesToShow { get; set; }
        public int TotalPg { get; set; }

    }
}
