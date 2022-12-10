
namespace Pagination
{
    public class PaginationHeader
    {
        public int PageIndex { get; set; }
        public int PageSize { get; set; }
        public int Length { get; set; }
        public int TotalPg { get; set; }
        public bool HasNextPage { get; set; }
        public bool HasPreviousPage { get; set; }
        public PaginationHeader(int PageIndex,
                                int PageSize,
                                int Length,
                                int TotalPg,
                                bool HasNextPage,
                                bool HasPreviousPage)
        {
            this.PageIndex = PageIndex;
            this.PageSize = PageSize;
            this.Length = Length;
            this.TotalPg = TotalPg;
            this.HasNextPage = HasNextPage;
            this.HasPreviousPage = HasPreviousPage;
        }



    }
}