
using Domain.Entities.RemoteCmd;
using Repository.Data.Context;
using Repository.Data.Operations.Repository;

namespace Repository.Data.Operations.RemoteCmd;

public class RemoteCmdMachineRepository : Repository<RemoteCmdMachine>, IRemoteCmdMachineRepository
{
    private readonly SonnyDbContext _CONTEXT;
    public RemoteCmdMachineRepository(SonnyDbContext CONTEXT) : base(CONTEXT)
    {
        _CONTEXT = CONTEXT;
    }

}