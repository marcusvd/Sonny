using System.Collections.Generic;


using Application.Services.Shared.Dtos.Mappers;
using Domain.Entities.RemoteCmd;


namespace Application.Services.Operations.RemoteCmd.Dtos.Mappers;

public partial class RemoteCmdMachineObjectMapperServices : CommonObjectMapper, IRemoteCmdMachineObjectMapperServices
{
    public List<TargetDto> TargetsListMake(List<Target> list)
    {
        if (list == null) return null;

        var toReturn = new List<TargetDto>();

        list.ForEach(x =>
        {
            toReturn.Add(TargetsMapper(x));
        });

        return toReturn;
    }
    public List<Target> TargetsListMake(List<TargetDto> list)
    {
        if (list == null) return null;

        var toReturn = new List<Target>();

        list.ForEach(x =>
        {
            toReturn.Add(TargetsMapper(x));
        });


        return toReturn;
    }
    public TargetDto TargetsMapper(Target entity)
    {
        if (entity == null) return null;

        var obj = new TargetDto()
        {
            Id = entity.Id,
            Computer = entity.Computer,
            RemoteCmdMachineId = entity.RemoteCmdMachineId,
            ResultsExecutedCommands = ResultsExecutedCommandsListMake(entity.ResultsExecutedCommands)
            
        };

        return obj;
    }
    public Target TargetsMapper(TargetDto entity)
    {
        if (entity == null) return null;

        var obj = new Target()
        {
            Id = entity.Id,
            Computer = entity.Computer,
            RemoteCmdMachineId = entity.RemoteCmdMachineId,
            ResultsExecutedCommands = ResultsExecutedCommandsListMake(entity.ResultsExecutedCommands)
        };

        return obj;
    }
}