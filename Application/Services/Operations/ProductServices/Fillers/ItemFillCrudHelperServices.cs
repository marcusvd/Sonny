using System.Collections.Generic;
using System.Linq;
using Application.Services.Helpers;
using Application.Services.Operations.ProductServices.Dtos.Fill;
using AutoMapper;
using Domain.Entities.Fill.StkProduct;

namespace Application.Services.Operations.ProductServices
{

    public class ItemFillCrudHelperServices
    {
        private readonly IMapper _MAP;
        public ItemFillCrudHelperServices(IMapper MAP)
        {
            _MAP = MAP;
        }

        public ItemDto ItemNameNormalize(ItemDto entityDto)
        {

            var ItemListNameHandled = new List<ItemDto>();

            entityDto.Name = StringHandlerServices.RemoveAccentsAndNormalize(entityDto.Name);

            entityDto.Manufacturers.ToList().ForEach(xm =>
            {
                xm.Name = StringHandlerServices.RemoveAccentsAndNormalize(xm.Name);
            });

            entityDto.Segments.ToList().ForEach(xs =>
            {
                xs.Name = StringHandlerServices.RemoveAccentsAndNormalize(xs.Name);
            });



            return entityDto;
        }

        public Item HandleEntities(ItemDto dtoViewHandled, Item fromDb)
        {

            if (dtoViewHandled.Name == fromDb.Name)
            {
                dtoViewHandled.Id = fromDb.Id;

                fromDb.Manufacturers.ToList().ForEach(fdbm =>
                {
                    dtoViewHandled.Manufacturers.ToList().ForEach(tdbm =>
                    {
                        if (fdbm.Name == tdbm.Name)
                            tdbm.Id = fdbm.Id;

                    });
                });

                fromDb.Segments.ToList().ForEach(fdbs =>
                {
                    dtoViewHandled.Segments.ToList().ForEach(tdbs =>
                    {
                        if (fdbs.Name == tdbs.Name)
                            tdbs.Id = fdbs.Id;

                    });
                });

                //   fdb.Models.ToList().ForEach(fdbl =>
                //   {
                //       fromDbHandled.Models.ToList().ForEach(tdbl =>
                //       {
                //           if (fdbl.Name == tdbl.Name)
                //               tdbl.Id = fdbl.Id;

                //       });
                //   });

            }

            return _MAP.Map<Item>(dtoViewHandled);

        }

    }

}