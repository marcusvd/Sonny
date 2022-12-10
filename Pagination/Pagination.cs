using System.Text.Json;
using Microsoft.AspNetCore.Http;



namespace Pagination
{
    public static class Pagination
    {
        public static void AddPagination(this HttpResponse response,
                                         int pageIndex,
                                         int pageSize,
                                         int length,
                                         int TotalPg,
                                         bool hasNextPage,
                                         bool hasPreviousPage

         )

        {
            var Pagination = new PaginationHeader(
                pageIndex,
                pageSize,
                length,
                TotalPg,
                hasNextPage,
                hasPreviousPage
            );
            var options = new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            };
            response.Headers.Add("pagination", JsonSerializer.Serialize(Pagination, options));
            response.Headers.Add("Access-Control-Expose-Headers", "pagination");
           
        }











    }
}