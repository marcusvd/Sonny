using Domain.Entities.Authentication;

namespace Domain.Entities.Financial
{
    public class TypePayment
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }
        public virtual Company Company { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
