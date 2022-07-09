using System;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using AutoMapper;
using Services.Services.Contracts;
using UnitOfWork.Persistence.Contracts;

namespace Services.Services.Operations
{
    // public class ApplicationService<T> : IApplicationService<T> where T : class
    // {
    //     private readonly IMapper _MAP;

    //     private readonly IUnitOfWork _GENERIC_REPO;
    //     ApplicationService()
    //     {

    //     }
        // public async Task<T> Add(T entity)
        // {
        //     string TEntity = entity.GetType().FullName.Split('.').Last();

        //     int chars = TEntity.Length - 3;

        //     string result = TEntity.Remove(chars, TEntity.Length);

        //     var tp = Type.GetType(result);

        //      _GENERIC_REPO.Checkingaccounts.GetType();

        //     var toDb = _MAP.Map<tp>(entity)


        //     return null;



        // }
    // }
}