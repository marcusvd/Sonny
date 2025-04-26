
namespace Application.Services.Operations.RemoteCmd
{
    public class RemoteCmdMachineServices
    {
        private readonly IRemoteCmdMachineServices _remoteCmdMachineServices;
        public RemoteCmdMachineServices(IRemoteCmdMachineServices remoteCmdMachineServices)
        {
            _remoteCmdMachineServices = remoteCmdMachineServices;
        }
    }
}