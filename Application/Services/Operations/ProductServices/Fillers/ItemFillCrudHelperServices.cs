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

        public List<ItemDto> ItemNameNormalize(List<ItemDto> entitiesDto)
        {

            var ItemListNameHandled = new List<ItemDto>();

            entitiesDto.ForEach(x =>
            {

                x.Name = StringHandlerServices.RemoveAccentsAndNormalize(x.Name);

                x.Manufacturers.ToList().ForEach(xm =>
                {
                    xm.Name = StringHandlerServices.RemoveAccentsAndNormalize(xm.Name);
                });

                x.Segments.ToList().ForEach(xs =>
                {
                    xs.Name = StringHandlerServices.RemoveAccentsAndNormalize(xs.Name);
                });

                // x.Models.ToList().ForEach(xl =>
                // {
                //     xl.Name = StringHandlerServices.RemoveAccentsAndNormalize(xl.Name);
                // });
                // ItemListNameHandled.Add(x);
            });

            return ItemListNameHandled;
        }

        public List<Item> ListToAdd(List<Item> fromDb, List<ItemDto> fromView)
        {

            var itemNamesFromDb = fromDb.Select(x => x.Name).ToList();
            var itemNamesFromView = fromView.Select(x => x.Name).ToList();
            var namesToAdd = itemNamesFromView.Except(itemNamesFromDb).ToList();

            var handledToDb = new List<Item>();

            fromView.ForEach(x =>
            {
                namesToAdd.ForEach(xy =>
                {
                    if (x.Name == xy)
                        handledToDb.Add(_MAP.Map<Item>(x));
                });
            });
          
            return handledToDb;
        }

        public List<Item> HandleEntities(List<Item> fromDbRaw, List<Item> fromDbHandled)
        {
            var newListToUpdate = new List<Item>();

            fromDbRaw.ForEach(fdb =>
                      {
                          fromDbHandled.ForEach(tdb =>
                          {

                              if (fdb.Name == tdb.Name)
                              {
                                  tdb.Id = fdb.Id;

                                  fdb.Manufacturers.ToList().ForEach(fdbm =>
                                  {
                                      tdb.Manufacturers.ToList().ForEach(tdbm =>
                                      {
                                          if (fdbm.Name == tdbm.Name)
                                              tdbm.Id = fdbm.Id;

                                      });
                                  });

                                  fdb.Segments.ToList().ForEach(fdbs =>
                                  {
                                      tdb.Segments.ToList().ForEach(tdbs =>
                                      {
                                          if (fdbs.Name == tdbs.Name)
                                              tdbs.Id = fdbs.Id;

                                      });
                                  });

                                //   fdb.Models.ToList().ForEach(fdbl =>
                                //   {
                                //       tdb.Models.ToList().ForEach(tdbl =>
                                //       {
                                //           if (fdbl.Name == tdbl.Name)
                                //               tdbl.Id = fdbl.Id;

                                //       });
                                //   });


                                  newListToUpdate.Add(tdb);
                              }
                          });


                      });

            return newListToUpdate;

        }

    }

}