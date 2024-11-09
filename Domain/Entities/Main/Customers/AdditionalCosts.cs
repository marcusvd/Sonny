
using System;
using Domain.Entities.Shared;

namespace Domain.Entities.Main.Customers
{

    public class AdditionalCosts : RootBase
    {
        public AdditionalCosts() { }
        public AdditionalCosts(
            decimal fixedPhysicallyMovingCosts,
            int companyId,
            DateTime deleted,
            DateTime registered

            )
        {
            FixedPhysicallyMovingCosts = fixedPhysicallyMovingCosts;
            CompanyId = companyId;
            Deleted = deleted;
            Registered = registered;
        }

        public decimal FixedPhysicallyMovingCosts { get; set; }

    }
}
