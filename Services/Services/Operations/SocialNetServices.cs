using System;
using System.Threading.Tasks;
using AutoMapper;
using Services.Services.Contracts;
using Domain.Entities;
using UnitOfWork.Persistence.Contracts;

namespace Services.Services.Operations
{
    public class SocialNetServices : ISocialNetServices
    {
        // private readonly ISocialNetworkRepository _SOCIAL_NET_REPO;
        private readonly IMapper _MAP;
        private readonly IUnitOfWork _GENERIC_REPO;
        public SocialNetServices(
                         IUnitOfWork GENERIC_REPO,
                         IMapper MAP
                        //  ISocialNetworkRepository SOCIAL_NET_REPO
                        )
        {
            _MAP = MAP;
            _GENERIC_REPO = GENERIC_REPO;
            // _SOCIAL_NET_REPO = SOCIAL_NET_REPO;
        }
    
        public async Task<bool> DeleteAsync(int id)
        {
            try
            {
                SocialNetwork record = await _GENERIC_REPO.Socialnetworks.GetByIdAsync(_id => _id.Id == id);

                if (record == null) throw new Exception("Não encontrado para exclusão.");

                _GENERIC_REPO.Socialnetworks.Delete(record);

                return await _GENERIC_REPO.save();

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }
    }

}