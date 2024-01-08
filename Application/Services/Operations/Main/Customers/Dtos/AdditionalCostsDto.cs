
namespace Domain.Entities.Main.Customers
{

    public class AdditionalCostsDto
    {
        public AdditionalCostsDto() { }
        public AdditionalCostsDto(decimal fixedPhysicallyMovingCosts)
        {
            FixedPhysicallyMovingCosts = fixedPhysicallyMovingCosts;
        }
        public int Id { get; set; }
        public decimal FixedPhysicallyMovingCosts { get; set; }

    }
}
