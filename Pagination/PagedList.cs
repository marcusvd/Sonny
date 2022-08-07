using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Pagination
{
    public class PagedList<T> : List<T>
    {
        public int pageIndex { get; set; }
        public int pageSize { get; set; }
        public int length { get; set; }
        public int TotalPg { get; set; }
        public bool hasNextPage => pageIndex < TotalPg;
        public bool hasPreviousPage => pageIndex > 1;






        public PagedList(List<T> items, int count, int pgNumber, int pgSize)
        {
            length = count;
            pageIndex = pgNumber;
            pageSize = pgSize;
            TotalPg = (int)Math.Ceiling(count / (double)pgSize);
            AddRange(items);

        }
        public PagedList()
        { }

        public static async Task<PagedList<T>> ToPagedList(IQueryable<T> source, int pgNumber, int pgSize)
        {
            var count = await source.CountAsync();
            var items = await source.Skip((pgNumber -1) * pgSize).Take(pgSize).ToListAsync();
            return new PagedList<T>(items, count, pgNumber, pgSize);
        }


    }
}
