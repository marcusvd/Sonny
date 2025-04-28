
using System.Collections.Generic;
using Domain.Entities.RemoteCmd.ReturnResults;

namespace Domain.Entities.RemoteCmd;

public class Target
{
    public int Id { get; set; }
    public string Computer { get; set; }
    public int RemoteCmdMachineId { get; set; }
    public RemoteCmdMachine RemoteCmdMachine { get; set; }
    public List<ResultExecutedCommand> ResultsExecutedCommands { get; set; } = new List<ResultExecutedCommand>();
}
