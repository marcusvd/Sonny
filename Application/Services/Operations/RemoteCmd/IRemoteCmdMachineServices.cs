
using System.Threading.Tasks;
using Application.Services.Operations.RemoteCmd.Dto;
using Domain.Entities.RemoteCmd;


namespace Application.Services.Operations.RemoteCmd;

public interface IRemoteCmdMachineServices
{
    Task<RemoteCmdMachine> AddAsyncRemoteCmdMachine(RemoteCmdMachineDto entityDto);
}