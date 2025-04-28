using System.Collections.Generic;
using Domain.Entities.Main.Customers;

namespace Domain.Entities.RemoteCmd;

public class RemoteCmdMachine
{
    public int Id { get; set; }
    public int CustomerId { get; set; }
    public Customer Customer { get; set; }
    public bool Disabled { get; set; }
    public string DomainExecution { get; set; }
    public string ExecutionSecretCode { get; set; }
    public List<Target> Targets { get; set; } = new List<Target>();
}

