

using System.Linq;
using Domain.Entities.Main.Companies;
using Repository.Data.Context;
using System.Threading.Tasks;
using System.Collections.Generic;
using Domain.Entities.Shared;
using System;
using Microsoft.EntityFrameworkCore;
using UnitOfWork.Persistence.Operations;
using Domain.Entities.Outsourced;

namespace Application.Services.Shared.Seed.EntitiesSeed
{
    public class CollectDeliverSeed
    {

        public CollectDeliver Cd01()
        {
            var collectDeliver01 = new CollectDeliver()
            {
                TransporterId = 3,
                ContactName = "Aphonso",
                Start = DateTime.Now,
                Price = 50,
                WasPaid = DateTime.MinValue,
                Collect = DateTime.Now,
                Deliver = new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day + 2),
                Other = DateTime.MinValue,
                KindTransport = "MotoBoy",
                TaskOverView = "Coletar notebook dell preto I3 para formatação.\nEntregar após formatado. Ida e volta",
                BillingFrom = new BillingFrom()
                {
                    PartnerId = null,
                    CustomerId = 6,
                    Base = false
                },
                Destiny = new Destiny()
                {
                    CustomerId = 6,
                    PartnerId = null,
                    NoRegisterName = null,
                    NoRegisterAddress = null,
                },
            };
            return collectDeliver01;

        }

    }
}

