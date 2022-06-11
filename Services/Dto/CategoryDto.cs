using System;
using System.Collections.Generic;

namespace Services.Dto
{
    public class CategoryDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<SubCategoryDto> subcategories { get; set; }
    }
}