using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Pagination
{
    public class PagedList<T> : List<T>
    {
        public int TotalItems { get; set; }
        public int PgSize { get; set; }
        public int CurrentPg { get; set; }
        public int TotalPg { get; set; }
        public bool HasNext => CurrentPg < TotalPg;
        public bool HasPrevious => CurrentPg > 1;

        public PagedList(List<T> items, int count, int pgNumber, int pgSize)
        {
            TotalItems = count;
            CurrentPg = pgNumber;
            PgSize = pgSize;
            TotalPg = (int)Math.Ceiling(count / (double)pgSize);
            AddRange(items);

        }
        public PagedList()
        { }

        public static async Task<PagedList<T>> ToPagedList(IQueryable<T> source, int pgNumber, int pgSize)
        {
            var count = source.Count();
            var items = await source.Skip((pgNumber -1) * pgSize).Take(pgSize).ToListAsync();
            return new PagedList<T>(items, count, pgNumber, pgSize);
        }


    }
}
