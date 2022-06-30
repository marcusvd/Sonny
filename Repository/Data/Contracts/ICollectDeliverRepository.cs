using System.Threading.Tasks;
using Domain.Entities;
using Repository.Contracts;

namespace Repository.Data.Contracts
{
    public interface ICollectDeliverRepository: IRepository<CollectDeliver>
    {
          Task<bool> save();
    }
}