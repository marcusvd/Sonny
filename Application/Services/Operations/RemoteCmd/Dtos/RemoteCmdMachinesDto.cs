using System.Collections.Generic;
using Application.Services.Operations.RemoteCmd.Dtos;
using Domain.Entities.Main.Customers;

namespace Application.Services.Operations.RemoteCmd.Dto;

public class RemoteCmdMachineDto
{
    public int Id { get; set; }
    public int CustomerId { get; set; }
    public Customer Customer { get; set; }
    public bool Disabled { get; set; }
    public string DomainExecution { get; set; }
    public string ExecutionSecretCode { get; set; }
    public List<TargetDto> Targets { get; set; } = new List<TargetDto>();
}