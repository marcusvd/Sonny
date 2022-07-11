using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;


namespace Pagination
{
    public class PgParams
    {

        const int maxPgSize = 100;
        public int PgNumber { get; set; } =1;
        public int _pgSize = 10;

        public int PgSize
        {
            get
            {
                return _pgSize;
            }
            set
            {
                _pgSize = (value > maxPgSize) ? maxPgSize : value;
            }
        }

        public string Term { get; set; } = string.Empty;
        public string Field { get; set; } = string.Empty;

    }
}