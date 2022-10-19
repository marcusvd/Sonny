using System;
using System.Threading.Tasks;
using AutoMapper;
using Services.Services.Contracts;
using Services.Dto;
using Services.Dto.CollectsDelivers;
using Domain.Entities;
using Repository.Data;
using Repository.Data.Operations;
using Repository.Data.Contracts;
using UnitOfWork.Persistence.Contracts;
using System.Collections.Generic;
using Pagination;

namespace Services.Services.Operations
{
    public class CollectDeliverServices : ICollectDeliverServices
    {
        //private readonly IClientRepository _CLIENT_REPO;
        private readonly IMapper _MAP;
        private readonly IUnitOfWork _GENERIC_REPO;
        public CollectDeliverServices(
                         // IClientRepository CLIENT_REPO,
                         IUnitOfWork GENERIC_REPO,
                         IMapper MAP
                        )
        {
            _MAP = MAP;
            _GENERIC_REPO = GENERIC_REPO;
        }
        public async Task<CollectDeliverDto> AddAsync(CollectDeliverDto viewModel)
        {
            try
            {
                if (viewModel == null) throw new Exception("Erro, Objeto era nulo.");

                CollectDeliver record = _MAP.Map<CollectDeliver>(viewModel);

                // if (record.DestinyClient.Id == 0)
                // {
                //     record.DestinyClient.Id = 0;
                // }
                // if (record.DestinyPartner.Id == 0)
                // {
                //     record.DestinyPartner.Id = 0;
                // }

                // if (record.SourceClient.Id == 0)
                // {
                //     record.SourceClient.Id = 0;
                // }
                // if (record.SourcePartner.Id == 0)
                // {
                //     record.SourcePartner.Id = 0;
                // }

                _GENERIC_REPO.CollectDeliver.AddAsync(record);

                if (await _GENERIC_REPO.save())
                {
                    CollectDeliver recordDb = await _GENERIC_REPO.CollectDeliver.GetByIdAsync(_id => _id.Id == viewModel.Id);
                    return _MAP.Map<CollectDeliverDto>(record);
                }
                else
                {
                    throw new Exception("Erro desconhecido...");
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"{ex.Message}");
            }
        }


        public async Task<bool> DeleteAsync(int id)
        {
            try
            {
                CollectDeliver record = await _GENERIC_REPO.CollectDeliver.GetByIdAsync(_id => _id.Id == id);
                if (record == null) throw new Exception("O objeto é nulo.");

                _GENERIC_REPO.CollectDeliver.Delete(record);
                return await _GENERIC_REPO.save();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<CollectDeliverDto> EditAsync(int id, CollectDeliverDto CollectDeliverDto)
        {
            try
            {
                CollectDeliver record = await _GENERIC_REPO.CollectDeliver.GetByIdAsync(_id => _id.Id == id);

                if (record == null) throw new Exception("O objeto é nulo.");

                CollectDeliverDto.Id = record.Id;

                _MAP.Map(CollectDeliverDto, record);

                _GENERIC_REPO.CollectDeliver.Update(record);

                if (await _GENERIC_REPO.save())
                {
                    CollectDeliver recordReturn = await _GENERIC_REPO.CollectDeliver.GetByIdAsync(_id => _id.Id == id);
                    return _MAP.Map<CollectDeliverDto>(recordReturn);
                }

                throw new Exception("Erro, objeto não foi atualizado.");
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }


        public async Task<PagedListDto<CollectDeliverDto>> GetAllPagedAsync(PgParams parameters)
        {
            try
            {
                var recordsFromDb = await _GENERIC_REPO.CollectDeliver.GetAllPaged(parameters);

                if (recordsFromDb == null) throw new Exception("O Objeto era nulo.");

                List<CollectDeliverDto> toDto = _MAP.Map<List<CollectDeliverDto>>(recordsFromDb);
                /*
                                var toViewDto = new List<CollectDeliverToView>();

                                recordsFromDb.ForEach(cd =>
                                {
                                    var toView = new CollectDeliverToView();

                                    if (cd.SourceClientId != null)
                                    { toView.Source = cd.SourceClient.Name; }

                                    if (cd.SourcePartnerId != null)
                                    { toView.Source = cd.SourcePartner.Name; }

                                    if (cd.SourceCompanyId != null)
                                    { toView.Source = cd.SourceCompany.Name; }

                                    //Destiny
                                    if (cd.DestinyClientId != null)
                                    { toView.Destiny = cd.DestinyClient.Name; }

                                    if (cd.DestinyPartnerId != null)
                                    { toView.Destiny = cd.DestinyPartner.Name; }

                                    if (cd.DestinyCompanyId != null)
                                    { toView.Destiny = cd.DestinyCompany.Name; }

                                    //NoRegistered
                                    if (cd.SourceNoRegisterAddress != string.Empty)
                                    { toView.Source = $"{cd.SourceNoRegisterName} {cd.SourceNoRegisterAddress}"; }

                                    if (cd.DestinyNoRegisterAddress != string.Empty)
                                    { toView.Destiny = $"{cd.DestinyNoRegisterName} {cd.DestinyNoRegisterAddress}"; }

                                    toView.Subject = cd.Subject;
                                    toView.Start = cd.Start;

                                    toViewDto.Add(toView);

                                });
                */
                var resultReturn = new PagedListDto<CollectDeliverDto>();
                resultReturn.pageIndex = recordsFromDb.pageIndex;
                resultReturn.length = recordsFromDb.length;
                resultReturn.TotalPg = recordsFromDb.TotalPg;
                resultReturn.pageSize = recordsFromDb.pageSize;
                resultReturn.hasNextPage = recordsFromDb.hasNextPage;
                resultReturn.hasPreviousPage = recordsFromDb.hasPreviousPage;
                resultReturn.EntitiesToShow = toDto;

                return resultReturn;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public async Task<PagedListDto<CollectDeliverDto>> GetCurrentDatePagedAsync(PgParams parameters)
        {
            try
            {

                PagedList<CollectDeliver> fromDb = await _GENERIC_REPO.CollectDeliver.GetByDateCurrentMonth(parameters);

                if (fromDb == null) throw new Exception("O Objeto era nulo.");

                PagedListDto<CollectDeliverDto> resultPaged = new PagedListDto<CollectDeliverDto>();

                resultPaged.pageIndex = fromDb.pageIndex;
                resultPaged.TotalPg = fromDb.TotalPg;
                resultPaged.length = fromDb.length;
                resultPaged.hasNextPage = fromDb.hasNextPage;
                resultPaged.hasPreviousPage = fromDb.hasPreviousPage;


                resultPaged.EntitiesToShow = _MAP.Map<List<CollectDeliverDto>>(fromDb);

                return resultPaged;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        // public async Task<CollectDeliverDto[]> GetAllAsync()
        // {
        //     try
        //     {
        //         List<CollectDeliver> records = await _GENERIC_REPO.CollectDeliver.GetAllAsync();

        //         if (records == null) throw new Exception("O Objeto era nulo.");

        //         return _MAP.Map<CollectDeliverDto[]>(records);
        //     }
        //     catch (Exception ex)
        //     {
        //         throw new Exception(ex.Message);
        //     }
        // }

        public async Task<CollectDeliverDto> GetByIdAsync(int id)
        {
            try
            {
                CollectDeliver record = await _GENERIC_REPO.CollectDeliver.GetByIdAsync(_id => _id.Id == id);

                if (record == null) throw new Exception("O objeto era nulo");

                return _MAP.Map<CollectDeliverDto>(record);

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }


        }

        public async Task<PagedListDto<CollectDeliverToView>> GetIntervalDatePagedAsync(PgParams parameters)
        {
            var result = await _GENERIC_REPO.CollectDeliver.GetByIntervalDate(parameters);

            if (result == null) return null;

            List<CollectDeliverDto> ToDto = _MAP.Map<List<CollectDeliverDto>>(result);




            var toViewDto = new List<CollectDeliverToView>();

            result.ForEach(cd =>
            {
                var toView = new CollectDeliverToView();

                if (cd.SourceClientId != null)
                { toView.Source = cd.SourceClient.Name; }

                if (cd.SourcePartnerId != null)
                { toView.Source = cd.SourcePartner.Name; }

                if (cd.SourceCompanyId != null)
                { toView.Source = cd.SourceCompany.Name; }

                //Destiny
                if (cd.DestinyClientId != null)
                { toView.Destiny = cd.DestinyClient.Name; }

                if (cd.DestinyPartnerId != null)
                { toView.Destiny = cd.DestinyPartner.Name; }

                if (cd.DestinyCompanyId != null)
                { toView.Destiny = cd.DestinyCompany.Name; }

                //NoRegistered
                if (cd.SourceNoRegisterAddress != string.Empty)
                { toView.Source = $"{cd.SourceNoRegisterName} {cd.SourceNoRegisterAddress}"; }

                if (cd.DestinyNoRegisterAddress != string.Empty)
                { toView.Destiny = $"{cd.DestinyNoRegisterName} {cd.DestinyNoRegisterAddress}"; }

                toView.Subject = cd.Subject;
                toView.Start = cd.Start;

                toViewDto.Add(toView);

            });





            PagedListDto<CollectDeliverToView> resultToReturn = new PagedListDto<CollectDeliverToView>();

            resultToReturn.pageIndex = result.pageIndex;
            resultToReturn.TotalPg = result.TotalPg;
            resultToReturn.length = result.length;
            resultToReturn.hasNextPage = result.hasNextPage;
            resultToReturn.hasPreviousPage = result.hasPreviousPage;

            //resultToReturn.EntitiesToShow = ToDto;
            resultToReturn.EntitiesToShow = toViewDto;
            return resultToReturn;
        }
    }

}