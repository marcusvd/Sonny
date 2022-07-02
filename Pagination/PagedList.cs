using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Pagination
{
    public class PagedList<T> : List<T>
    {
        private int _CurrentPg { get; set; }
        private int _TotalPg { get; set; }
        private int _PgSize { get; set; }
        private int _TotalCount { get; set; }
        private bool _HasNext => _CurrentPg < _TotalPg;
        private bool _HasPrevious => _CurrentPg > 1;

        public PagedList(List<T> items, int count, int pgNumber, int pgSize)
        {
            _TotalCount = count;
            _CurrentPg = pgNumber;
            _PgSize = pgSize;
            _TotalPg = (int)Math.Ceiling(count / (double)pgSize);
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
