namespace Domain.Entities.Main.Inheritances
{
    public class PhysicallyMovingCosts
    {
        public int Id {get; set;}
        public decimal FixedCostAssured {get; set;}
        public decimal Fuel {get; set;}
        public decimal Apps {get; set;}
        public decimal PublicTransport {get; set;}
        public decimal MotoBoy {get; set;}
    }
}