using System.Threading.Tasks;

namespace Services.Services.Contracts
{
    public interface IApplicationService<T>
    {
        Task<T> Add(T entity);
    }
}