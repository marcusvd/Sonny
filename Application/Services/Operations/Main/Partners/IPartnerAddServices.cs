using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Services.Operations.Main.Partners.Dtos;
using Pagination.Models;

namespace Application.Services.Operations.Main.Partners
{
    public interface IPartnerAddServices
    {
        Task<PartnerDto> AddAsync(PartnerDto entityDto);
    }
}