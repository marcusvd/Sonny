using System.Collections.Generic;
using Application.Services.Operations.RemoteCmd.Dto;
using Domain.Entities.RemoteCmd;
using Domain.Entities.RemoteCmd.ReturnResults;


namespace Application.Services.Operations.RemoteCmd.Dtos.Mappers;

public interface IRemoteCmdMachineObjectMapperServices
{
    List<RemoteCmdMachineDto> RemotesCmdsMachinesListMake(List<RemoteCmdMachine> list);
    List<RemoteCmdMachine> RemotesCmdsMachinesListMake(List<RemoteCmdMachineDto> list);
    RemoteCmdMachineDto RemoteCmdMachineMapper(RemoteCmdMachine entity);
    RemoteCmdMachine RemoteCmdMachineMapper(RemoteCmdMachineDto entity);


    List<TargetDto> TargetsListMake(List<Target> list);
    List<Target> TargetsListMake(List<TargetDto> list);
    TargetDto TargetsMapper(Target entity);
    Target TargetsMapper(TargetDto entity);


    List<ResultExecutedCommandDto> ResultsExecutedCommandsListMake(List<ResultExecutedCommand> list);
    List<ResultExecutedCommand> ResultsExecutedCommandsListMake(List<ResultExecutedCommandDto> list);
    ResultExecutedCommandDto ResultExecutedCommandMapper(ResultExecutedCommand entity);
    ResultExecutedCommand ResultExecutedCommandMapper(ResultExecutedCommandDto entity);


    // RemoteCmdMachine RemoteCmdMachineUpdateMapper(RemoteCmdMachineUpdateDto dto, RemoteCmdMachine db);
}