namespace Pagination.Models
{
    public class SearchTerms
    {
        public string email { get; set; }
        public string cnpj { get; set; }
        public bool assured { get; set; }
        public bool notassured { get; set; }
        public bool entity { get; set; }
    }
}