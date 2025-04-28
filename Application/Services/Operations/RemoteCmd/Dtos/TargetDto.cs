using System.Collections.Generic;
using Application.Services.Operations.RemoteCmd.Dto;
using Application.Services.Operations.RemoteCmd.Dtos;

public class TargetDto
{
    public int Id { get; set; }
    public string Computer { get; set; }
    public int RemoteCmdMachineId { get; set; }
    public RemoteCmdMachineDto RemoteCmdMachine { get; set; }
    public List<ResultExecutedCommandDto> ResultsExecutedCommands { get; set; } = new List<ResultExecutedCommandDto>();
}