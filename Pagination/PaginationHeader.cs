using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;


namespace Pagination
{
    public class PaginationHeader
    {
        private int _CurrentPg { get; set; }
        private int _ItemsPerPg { get; set; }
        private int _AmountPg { get; set; }
        private int _AmountItems { get; set; }
        private bool _HasNext { get; set; }
        private bool _HasPrevious { get; set; }

        public PaginationHeader(int CurrentPg,
                                int ItemsPerPg,
                                int AmountPg,
                                int AmountItems,
                                bool HasNext,
                                bool HasPrevious)
        {
            _CurrentPg = CurrentPg;
            _ItemsPerPg = ItemsPerPg;
            _AmountPg = AmountPg;
            _AmountItems = AmountItems;
            _HasNext = HasNext;
            _HasPrevious = HasPrevious;
        }



    }
}