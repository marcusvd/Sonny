namespace Domain.Entities.ServicesBench
{
    public class CollectDeliverCosts
    {
        public int Id { get; set; }
        public bool FixedCostAssured { get; set; }
        public bool Fuel { get; set; }
        public bool Apps { get; set; }
        public bool PublicTransport { get; set; }
        public bool MotoBoy { get; set; }
        public bool RoundTrip { get; set; } = false;
        public decimal Apart { get; set; }


    }
}