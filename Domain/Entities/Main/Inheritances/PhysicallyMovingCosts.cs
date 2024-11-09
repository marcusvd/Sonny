using Domain.Entities.Shared;

namespace Domain.Entities.Main.Inheritances
{
    public class PhysicallyMovingCosts : RootBase
    {
        public PhysicallyMovingCosts()
        {

        }
        // public PhysicallyMovingCosts(decimal fuel, decimal apps, decimal publicTransport, decimal motoBoy)
        // {
        //     Fuel = fuel;
        //     Apps = apps;
        //     PublicTransport = publicTransport;
        //     MotoBoy = motoBoy;
        // }
        public decimal Fuel { get; set; }
        public decimal Apps { get; set; }
        public decimal PublicTransport { get; set; }
        public decimal MotoBoy { get; set; }
    }
}