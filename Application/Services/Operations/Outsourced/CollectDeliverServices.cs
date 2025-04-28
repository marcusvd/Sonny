using System;
using System.Threading.Tasks;
using UnitOfWork.Persistence.Operations;
using Domain.Entities.Outsourced;
using Application.Services.Operations.Outsourced.Dtos;
using Application.Exceptions;
using System.Linq;
using System.Net;
using Pagination.Models;
using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using Application.Services.Operations.Outsourced.Dtos.Mappers;
using Application.Services.Operations.Main.Partners.Dtos.Mappers;
using Application.Services.Operations.Main.Customers.Dtos.Mappers;


namespace Application.Services.Operations.Outsourced
{
    public class CollectDeliverServices : ICollectDeliverServices
    {
        private readonly IOutsourcedObjectMapperServices _IOutsourcedObjectMapperServices;

        private readonly IUnitOfWork _GENERIC_REPO;
        public CollectDeliverServices(
                         IUnitOfWork GENERIC_REPO,
                         IOutsourcedObjectMapperServices IOutsourcedObjectMapperServices

                        )
        {
            _IOutsourcedObjectMapperServices = IOutsourcedObjectMapperServices;

            _GENERIC_REPO = GENERIC_REPO;
        }
        public async Task<HttpStatusCode> AddAsync(CollectDeliverDto entityDto)
        {

            if (entityDto == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

            CollectDeliver entityToDb = _IOutsourcedObjectMapperServices.CollectDeliverMapper(entityDto);

            entityToDb.Registered = DateTime.Now;
            entityToDb.BillingFrom.Registered = DateTime.Now;
            entityToDb.Destiny.Registered = DateTime.Now;

         //   if (entityToDb.BillingFrom.Base)


                _GENERIC_REPO.CollectDeliver.Add(entityToDb);
            if (await _GENERIC_REPO.save())
                return HttpStatusCode.Created;

            throw new GlobalServicesException(GlobalErrorsMessagesException.UnknownError);
        }

        public async Task<CollectDeliverDto> GetByIdAllIncluded(int collectDeliverId)
        {

            var entityFromDb = await _GENERIC_REPO.CollectDeliver.GetById(
                 predicate => predicate.Id == collectDeliverId && predicate.Deleted == DateTime.MinValue,
                  toInclude => toInclude.Include(x => x.Destiny)
                                         .ThenInclude(x => x.Customer)
                                         .ThenInclude(x => x.PhysicallyMovingCosts)
                                         .Include(x => x.Destiny)
                                         .ThenInclude(x => x.Partner)
                                          .ThenInclude(x => x.PhysicallyMovingCosts)
                                         .Include(x => x.BillingFrom)
                                         .ThenInclude(x => x.Customer)
                                          .ThenInclude(x => x.PhysicallyMovingCosts)
                                         .Include(x => x.BillingFrom)
                                         .ThenInclude(x => x.Partner)
                                          .ThenInclude(x => x.PhysicallyMovingCosts)
                                         .Include(x => x.Transporter),
                                         selector => selector);

            if (entityFromDb == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            var toReturnViewDto = _IOutsourcedObjectMapperServices.CollectDeliverMapper(entityFromDb);

            return toReturnViewDto;

        }

        public async Task<PagedList<CollectDeliverDto>> GetAllPagedAsync(Params parameters)
        {


            Func<IQueryable<CollectDeliver>, IOrderedQueryable<CollectDeliver>> orderBy = null;

            var fromDb = await _GENERIC_REPO.CollectDeliver.GetPaged(
                                         parameters,
                                         predicate => predicate.CompanyId == parameters.predicate && predicate.Deleted == DateTime.MinValue,
                                         toInclude => toInclude.Include(x => x.Destiny)
                                         .ThenInclude(x => x.Customer)
                                         .Include(x => x.Destiny)
                                         .ThenInclude(x => x.Partner)
                                         .Include(x => x.BillingFrom)
                                         .ThenInclude(x => x.Customer)
                                         .Include(x => x.BillingFrom)
                                         .ThenInclude(x => x.Partner),
                                         selector => selector,
                                         orderBy,
                                         null
                                       );

            if (parameters.OrderBy != null)
            {

                var orderByObj = JsonSerializer.Deserialize<OrderBy>(parameters.OrderBy);


                if (!string.IsNullOrEmpty(orderByObj.orderbyfield))
                {

                    // if (orderByObj.isdescending)
                    //     orderBy = x => x.OrderByDescending(QueryHelperServices.GetProperty(orderByObj.orderbyfield));
                    // else
                    //     orderBy = x => x.OrderBy(QueryHelperServices.GetProperty(orderByObj.orderbyfield));

                }

                fromDb = await _GENERIC_REPO.CollectDeliver.GetPaged(
                                                        parameters,
                                                        predicate => predicate.CompanyId == parameters.predicate && predicate.Deleted == DateTime.MinValue,
                                                        toInclude => toInclude.Include(x => x.Destiny)
                                                        .Include(x => x.BillingFrom),
                                                        selector => selector,
                                                        orderBy,
                                                        null
                                                      );

            }


            if (!string.IsNullOrEmpty(parameters.Term))
            {

                fromDb = fromDb = await _GENERIC_REPO.CollectDeliver.GetPaged(
                                parameters,
                                predicate => predicate.CompanyId == parameters.predicate && predicate.Deleted == DateTime.MinValue,
                                toInclude => toInclude.Include(x => x.Destiny)
                                .Include(x => x.BillingFrom),
                                selector => selector,
                                null
                  //    term => term.Name.ToLower().Contains(parameters.Term.ToLower())
                  //    ||
                  //    term.CNPJ.ToLower().Contains(parameters.Term.ToLower())
                  //    ||
                  //    term.Responsible.ToLower().Contains(parameters.Term.ToLower())
                  //    ||
                  //    term.Contact.Email.ToLower().Contains(parameters.Term.ToLower())


                  );
            }

            if (fromDb == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            List<CollectDeliverDto> ViewDto = _IOutsourcedObjectMapperServices.CollectDeliverListMake(fromDb);

            var PgDto = new PagedList<CollectDeliverDto>()
            {
                CurrentPg = fromDb.CurrentPg,
                TotalPgs = fromDb.TotalPgs,
                PgSize = fromDb.PgSize,
                TotalCount = fromDb.TotalCount,
                HasPrevious = fromDb.HasPrevious,
                HasNext = fromDb.HasNext,
                EntitiesToShow = ViewDto
            };
            return PgDto;

        }

        public async Task<List<CollectDeliverDto>> GetAllByCompanyIdAsync(int id)
        {

            var fromDb = await _GENERIC_REPO.CollectDeliver.Get(
                x => x.CompanyId == id && x.Deleted == DateTime.MinValue,
                toInclude => toInclude.Include(x => x.Destiny)
                .ThenInclude(x => x.Customer)
                .Include(x => x.Destiny)
                .ThenInclude(x => x.Partner)
                .Include(x => x.BillingFrom)
                .ThenInclude(x => x.Customer)
                .Include(x => x.BillingFrom)
                .ThenInclude(x => x.Partner)
                ).ToListAsync();

            var toReturn = _IOutsourcedObjectMapperServices.CollectDeliverListMake(fromDb);

            if (fromDb == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            return toReturn;
        }

        public async Task<List<CollectDeliverDto>> GetAllByCompanyIdByMonthNumberAsync(LocalParams parameters)
        {

            var fromDb = await _GENERIC_REPO.CollectDeliver.Get(
                x => x.CompanyId == parameters.companyId && x.Deleted == DateTime.MinValue
                && x.Start.Month == parameters.monthNumber,
                toInclude => toInclude.Include(x => x.Destiny)
                .ThenInclude(x => x.Customer)
                .Include(x => x.Destiny)
                .ThenInclude(x => x.Partner)
                .Include(x => x.BillingFrom)
                .ThenInclude(x => x.Customer)
                .Include(x => x.BillingFrom)
                .ThenInclude(x => x.Partner)
                ).ToListAsync();

            var toReturn = _IOutsourcedObjectMapperServices.CollectDeliverListMake(fromDb);

            if (fromDb == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            return toReturn;
        }

        public async Task<HttpStatusCode> UpdateAsync(int collectDeliverId, CollectDeliverUpdateDto entity)
        {
            if (entity == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);
            if (collectDeliverId != entity.Id) throw new GlobalServicesException(GlobalErrorsMessagesException.IdIsDifferentFromEntityUpdate);

            var fromDb = await _GENERIC_REPO.CollectDeliver.GetById(
                x => x.Id == collectDeliverId,
                null,
                selector => selector
                );

            var updated = _IOutsourcedObjectMapperServices.CollectDeliverUpdateMapper(entity, fromDb);

            _GENERIC_REPO.CollectDeliver.Update(updated);

            var result = await _GENERIC_REPO.save();

            if (result)
                return HttpStatusCode.OK;

            return HttpStatusCode.BadRequest;
        }


        public async Task<HttpStatusCode> DeleteFakeAsync(int collectDeliverId)
        {

            var fromDb = await _GENERIC_REPO.CollectDeliver.GetById(
                x => x.Id == collectDeliverId,
                null,
                selector => selector
                );

            fromDb.Deleted = DateTime.Now;

            _GENERIC_REPO.CollectDeliver.Update(fromDb);

            var result = await _GENERIC_REPO.save();

            if (result)
                return HttpStatusCode.OK;

            return HttpStatusCode.BadRequest;
        }





    }

}