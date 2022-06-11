using System;
using System.Collections.Generic;

namespace Services.Dto
{
    public class SubCategoryDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int CategoryId { get; set; }
        public CategoryDto Category { get; set; }
    }
}