using System.Collections.Generic;
using Domain.Entities.Outsourced;
using Application.Services.Operations.Outsourced.Dtos;


namespace Application.Services.Operations.Outsourced.Dtos.Mappers
{
    public interface IOutsourcedObjectMapperServices
    {
        List<CollectDeliverDto> CollectDeliverListMake(List<CollectDeliver> list);
        List<CollectDeliver> CollectDeliverListMake(List<CollectDeliverDto> list);
        CollectDeliverDto CollectDeliverMapper(CollectDeliver entity);
        CollectDeliver CollectDeliverMapper(CollectDeliverDto entity);
        CollectDeliver CollectDeliverUpdateMapper(CollectDeliverUpdateDto dto, CollectDeliver db);


        List<BillingFromDto> BillingFromListMake(List<BillingFrom> list);
        List<BillingFrom> BillingFromListMake(List<BillingFromDto> list);
        BillingFromDto BillingFromMapper(BillingFrom entity);
        BillingFrom BillingFromMapper(BillingFromDto entity);
        BillingFrom BillingFromUpdateMapper(BillingFromDto dto, BillingFrom db);


        List<DestinyDto> DestinyListMake(List<Destiny> list);
        List<Destiny> DestinyListMake(List<DestinyDto> list);
        DestinyDto DestinyMapper(Destiny entity);
        Destiny DestinyMapper(DestinyDto entity);
        Destiny DestinyUpdateMapper(DestinyDto dto, Destiny db);
    }
}