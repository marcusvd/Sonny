using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;


namespace Pagination
{
    public static class Pagination
    {
        public static void AddPagination(this HttpResponse response,
                                         int CurrentPg,
                                         int ItemsPerPg,
                                         int AmountPg,
                                         int AmountItems,
                                         bool HasNext,
                                         bool HasPrevious
         )

        {
            var pagination = new PaginationHeader(CurrentPg,
                                                ItemsPerPg,
                                                AmountPg,
                                                AmountItems,
                                                HasNext,
                                                HasPrevious
                                                );
            var options = new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            };
            response.Headers.Add("Pagination", JsonSerializer.Serialize(pagination, options));
            response.Headers.Add("Access-Control-Expose-Headers", "Pagination");
        }











    }
}