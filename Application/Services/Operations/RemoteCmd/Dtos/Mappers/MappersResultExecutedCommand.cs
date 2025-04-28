using System.Collections.Generic;


using Application.Services.Shared.Dtos.Mappers;
using Domain.Entities.RemoteCmd.ReturnResults;


namespace Application.Services.Operations.RemoteCmd.Dtos.Mappers;
public partial class RemoteCmdMachineObjectMapperServices : CommonObjectMapper, IRemoteCmdMachineObjectMapperServices
{
    public List<ResultExecutedCommandDto> ResultsExecutedCommandsListMake(List<ResultExecutedCommand> list)
    {
        if (list == null) return null;

        var toReturn = new List<ResultExecutedCommandDto>();

        list.ForEach(x =>
        {
            toReturn.Add(ResultExecutedCommandMapper(x));
        });

        return toReturn;
    }
    public List<ResultExecutedCommand> ResultsExecutedCommandsListMake(List<ResultExecutedCommandDto> list)
    {
        if (list == null) return null;

        var toReturn = new List<ResultExecutedCommand>();

        list.ForEach(x =>
        {
            toReturn.Add(ResultExecutedCommandMapper(x));
        });


        return toReturn;
    }
    public ResultExecutedCommandDto ResultExecutedCommandMapper(ResultExecutedCommand entity)
    {
        if (entity == null) return null;

        var obj = new ResultExecutedCommandDto()
        {
            FilesPath = entity.FilesPath,
            Subject = entity.Subject,
            Body = entity.Body,
        };

        return obj;
    }
    public ResultExecutedCommand ResultExecutedCommandMapper(ResultExecutedCommandDto entity)
    {
        if (entity == null) return null;

        var obj = new ResultExecutedCommand()
        {
            FilesPath = entity.FilesPath,
            Subject = entity.Subject,
            Body = entity.Body,
        };

        return obj;
    }
}
