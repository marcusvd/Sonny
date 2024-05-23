
namespace Domain.Entities.Main.Customers
{

    public class AdditionalCosts
    {
        public AdditionalCosts() { }
        public AdditionalCosts(decimal fixedPhysicallyMovingCosts)
        {
            FixedPhysicallyMovingCosts = fixedPhysicallyMovingCosts;
        }
        public int Id { get; set; }
        public decimal FixedPhysicallyMovingCosts { get; set; }
        public bool Deleted {get; set;}
    }
}
