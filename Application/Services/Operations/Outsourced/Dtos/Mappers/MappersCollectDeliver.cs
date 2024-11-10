using System.Collections.Generic;


using Application.Services.Shared.Dtos.Mappers;
using Domain.Entities.Outsourced;
using System;


namespace Application.Services.Operations.Outsourced.Dtos.Mappers
{
    public partial class OutsourcedObjectMapperServices : CommonObjectMapper, IOutsourcedObjectMapperServices
    {
        public List<CollectDeliverDto> CollectDeliverListMake(List<CollectDeliver> list)
        {
            if (list == null) return null;

            var toReturn = new List<CollectDeliverDto>();

            list.ForEach(x =>
            {
                toReturn.Add(CollectDeliverMapper(x));
            });

            return toReturn;
        }
        public List<CollectDeliver> CollectDeliverListMake(List<CollectDeliverDto> list)
        {
            if (list == null) return null;

            var toReturn = new List<CollectDeliver>();

            list.ForEach(x =>
            {
                toReturn.Add(CollectDeliverMapper(x));
            });


            return toReturn;
        }
        public CollectDeliverDto CollectDeliverMapper(CollectDeliver entity)
        {
            if (entity == null) return null;

            var obj = new CollectDeliverDto()
            {
                Id = entity.Id,
                UserId = entity.UserId,
                CompanyId = entity.CompanyId,
                Deleted = entity.Deleted,
                Registered = entity.Registered,

                ContactName = entity.ContactName,
                Start = entity.Start,
                Price = entity.Price,
                WasPaid = entity.WasPaid,
                Collect = entity.Collect,
                Deliver = entity.Deliver,
                Other = entity.Other,
                KindTransport = entity.KindTransport,
                TransporterId = entity.TransporterId,
                TaskOverView = entity.TaskOverView,
                BillingFrom = BillingFromMapper(entity.BillingFrom),
                Destiny = DestinyMapper(entity.Destiny)
            };

            return obj;
        }
        public CollectDeliver CollectDeliverMapper(CollectDeliverDto entity)
        {
            if (entity == null) return null;

            var obj = new CollectDeliver()
            {
                Id = entity.Id,
                UserId = entity.UserId,
                CompanyId = entity.CompanyId,
                Deleted = entity.Deleted,
                Registered = entity.Registered,


                ContactName = entity.ContactName,
                Start = entity.Start,
                Price = entity.Price,
                WasPaid = entity.WasPaid,
                Collect = entity.Collect,
                Deliver = entity.Deliver,
                Other = entity.Other,
                KindTransport = entity.KindTransport,
                TransporterId = entity.TransporterId,
                TaskOverView = entity.TaskOverView,
                BillingFrom = BillingFromMapper(entity.BillingFrom),
                Destiny = DestinyMapper(entity.Destiny)
            };

            return obj;
        }
        public CollectDeliver CollectDeliverUpdateMapper(CollectDeliverUpdateDto dto, CollectDeliver db)
        {
            if (dto == null) return null;
            if (db == null) return null;

            var fromDb = kindOfCollectDeliver(dto, db);

            fromDb.Id = dto.Id;
            fromDb.UserId = dto.UserId;
            fromDb.CompanyId = dto.CompanyId;
            fromDb.ContactName = dto.ContactName;
            fromDb.Start = dto.Start;
            fromDb.Price = dto.Price;
            fromDb.WasPaid = fromDb.WasPaid;
            fromDb.KindTransport = dto.KindTransport;
            fromDb.TransporterId = dto.TransporterId;
            fromDb.TaskOverView = dto.TaskOverView;
            //fromDb.Transporter = _IPartnerObjectMapperServices.PartnerMapper(dto.Transporter);
            db.BillingFrom = BillingFromMapper(dto.BillingFrom);
            db.Destiny = DestinyMapper(dto.Destiny);

            return fromDb;
        }
        private CollectDeliver kindOfCollectDeliver(CollectDeliverUpdateDto entity, CollectDeliver fromDb)
        {

            var returnUpdated = fromDb;

            if (entity.Collect)
            {
                if (returnUpdated.Collect.Date == DateTime.MinValue.Date)
                    returnUpdated.Collect = DateTime.Now;
            }
            else
                returnUpdated.Collect = DateTime.MinValue;

            if (entity.Deliver)
            {
                if (returnUpdated.Deliver.Date == DateTime.MinValue.Date)
                    returnUpdated.Deliver = DateTime.Now;
            }
            else
                returnUpdated.Deliver = DateTime.MinValue;

            if (entity.Other)
            {
                if (returnUpdated.Other.Date == DateTime.MinValue.Date)
                    returnUpdated.Other = DateTime.Now;
            }
            else
                returnUpdated.Other = DateTime.MinValue;

            return returnUpdated;

        }

    }
}