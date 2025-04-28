
using System;
using System.Threading.Tasks;
using Application.Exceptions;
using Application.Services.Operations.RemoteCmd.Dto;
using Application.Services.Operations.RemoteCmd.Dtos.Mappers;
using UnitOfWork.Persistence.Operations;

using Domain.Entities.RemoteCmd;

namespace Application.Services.Operations.RemoteCmd;

public class RemoteCmdMachineServices:IRemoteCmdMachineServices
{

    private readonly IRemoteCmdMachineObjectMapperServices _mapper;
    private readonly IUnitOfWork _GENERIC_REPO;
    public RemoteCmdMachineServices(
        IRemoteCmdMachineObjectMapperServices mapper,
        IUnitOfWork GENERIC_REPO
        )
    {
        _GENERIC_REPO = GENERIC_REPO;
        _mapper = mapper;
    }

    public async Task<RemoteCmdMachine> AddAsyncRemoteCmdMachine(RemoteCmdMachineDto entityDto)
    {
        try
        {
            if (entityDto == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

            var dtoToDb = _mapper.RemoteCmdMachineMapper(entityDto);

            _GENERIC_REPO.RemoteCmdMachine.Add(dtoToDb);

            if (await _GENERIC_REPO.save())
            {
                var retrived = await _GENERIC_REPO.RemoteCmdMachine.GetById(
                       predicate => predicate.Id == dtoToDb.Id,
                         null,
                      selector => selector);

                return retrived;
            }

        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }
        throw new Exception("Unknown error.");
    }

}