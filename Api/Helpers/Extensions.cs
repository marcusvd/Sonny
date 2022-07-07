using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using Pagination;

namespace Api.Helpers
{
    public static class Extensions
    {

        public static void AddPagination(this HttpResponse response,
        int currentPg, int itemsPerPg, int totalItems, int totalPg, bool hasNext, bool hasPrevious)
        {
            var paginationHeader = new PaginationHeader(currentPg, itemsPerPg, totalItems, totalPg, hasNext, hasPrevious);
            response.Headers.Add("Pagination", JsonConvert.SerializeObject(paginationHeader));
            response.Headers.Add("Access-Control-Expose-Header","Pagination");
        }



    }
}