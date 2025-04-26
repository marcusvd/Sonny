
using Repository.Data.Operations.Repository;

namespace Repository.Data.Operations.RemoteCmd;

public class RemoteCmdMachineRepository:Repository<IRemoteCmdMachineRepository>
{
    private readonly IRemoteCmdMachineRepository _remoteCmdMachineServices;
    public RemoteCmdMachineRepository(IRemoteCmdMachineRepository remoteCmdMachineServices)
    {
        _remoteCmdMachineServices = remoteCmdMachineServices;
    }
}