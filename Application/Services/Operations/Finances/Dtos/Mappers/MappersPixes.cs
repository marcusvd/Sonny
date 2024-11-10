using System.Collections.Generic;


using Application.Services.Operations.Finances.Dtos.Bank;
using Application.Services.Shared.Dtos.Mappers;
using Domain.Entities.Finances.Bank;

namespace Application.Services.Operations.Finances.Dtos.Mappers
{
    public partial class FinancialObjectMapperServices:CommonObjectMapper, IFinancialObjectMapperServices
    {
        public List<PixDto> PixListMake(List<Pix> list)
        {
            if (list == null) return null;

            var toReturn = new List<PixDto>();

            list.ForEach(x =>
            {
                toReturn.Add(PixMapper(x));
            });


            return toReturn;
        }
        public List<Pix> PixListMake(List<PixDto> list)
        {
            if (list == null) return null;

            var toReturn = new List<Pix>();

            list.ForEach(x =>
            {
                toReturn.Add(PixMapper(x));
            });


            return toReturn;
        }
        public PixDto PixMapper(Pix entity)
        {
            if (entity == null) return null;

            var obj = new PixDto()
            {
                Id = entity.Id,
                Key = entity.Key,
                Value = entity.Value,
                Deleted = entity.Deleted,
                BankAccountId = entity.BankAccountId,
            };

            return obj;
        }
        public Pix PixMapper(PixDto entity)
        {
            if (entity == null) return null;

            var obj = new Pix()
            {
                Id = entity.Id,
                Key = entity.Key,
                Value = entity.Value,
                Deleted = entity.Deleted,
                BankAccountId = entity.BankAccountId,
            };

            return obj;
        }

    }
}