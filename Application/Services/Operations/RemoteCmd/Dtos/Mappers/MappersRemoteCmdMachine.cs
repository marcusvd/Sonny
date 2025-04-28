using System.Collections.Generic;


using Application.Services.Shared.Dtos.Mappers;
using Application.Services.Operations.RemoteCmd.Dto;
using Domain.Entities.RemoteCmd;


namespace Application.Services.Operations.RemoteCmd.Dtos.Mappers;

public partial class RemoteCmdMachineObjectMapperServices : CommonObjectMapper, IRemoteCmdMachineObjectMapperServices
{
      public List<RemoteCmdMachineDto> RemotesCmdsMachinesListMake(List<RemoteCmdMachine> list)
    {
        if (list == null) return null;

        var toReturn = new List<RemoteCmdMachineDto>();

        list.ForEach(x =>
        {
            toReturn.Add(RemoteCmdMachineMapper(x));
        });

        return toReturn;
    }
    public List<RemoteCmdMachine> RemotesCmdsMachinesListMake(List<RemoteCmdMachineDto> list)
    {
        if (list == null) return null;

        var toReturn = new List<RemoteCmdMachine>();

        list.ForEach(x =>
        {
            toReturn.Add(RemoteCmdMachineMapper(x));
        });


        return toReturn;
    }
    public RemoteCmdMachineDto RemoteCmdMachineMapper(RemoteCmdMachine entity)
    {
        if (entity == null) return null;

        var obj = new RemoteCmdMachineDto()
        {
            Id = entity.Id,
            CustomerId = entity.CustomerId,
            Disabled = entity.Disabled,
            DomainExecution = entity.DomainExecution,
            ExecutionSecretCode = entity.ExecutionSecretCode,
            Targets = TargetsListMake(entity.Targets)
        };

        return obj;
    }
    public RemoteCmdMachine RemoteCmdMachineMapper(RemoteCmdMachineDto entity)
    {
        if (entity == null) return null;

        var obj = new RemoteCmdMachine()
        {
            Id = entity.Id,
            CustomerId = entity.CustomerId,
            Disabled = entity.Disabled,
            DomainExecution = entity.DomainExecution,
            ExecutionSecretCode = entity.ExecutionSecretCode,
            Targets = TargetsListMake(entity.Targets)
        };

        return obj;
    }


}