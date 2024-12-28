// using System.Collections.Generic;
// using Domain.Entities.StockProduct.ProductKind;

// namespace Application.Services.Shared.Seed.EntitiesSeed
// {
//     public class ProductDtoSeed_NSTI
//     {

//         public ProductType NetAdapter()
//         {



//             // List<Model> models = new(){
//             //     new Model(){  Name = "REALTEK RTL8723AE", CompanyId = 1, Description = "Taxa de Transferência: 10/100/1000 Mbps" },
//             // };

//             // List<Manufacturer> manufacturers = new(){
//             //     new Manufacturer(){  Name = "Realtek", CompanyId = 1, Models = models},
//             // };

//             // List<Segment> segments = new(){
//             //     new Segment(){  Name = "Notebook", CompanyId = 1, Manufacturers = manufacturers},
//             // };

//             // var productType = new ProductType()
//             // {
//             //     CompanyId = 1,
//             //     Name = "Placas de rede",
//             //     Segments = segments,
//             // };








//             //   List<Model> modelsServer = new(){
//             //     new Model(){  Name = "MTS-PCIELAN8111", CompanyId = 1, Description = "Taxa de Transferência: 10/100/1000 Mbps" },
//             //     new Model(){  Name = "RTL-8139", CompanyId = 1, Description = "Taxa de Transferência: 10/100 Mbps" },
//             //     new Model(){  Name = "Gamer", CompanyId = 1, Description = "Taxa de Transferência: 10/100/1000 Mbps" },
//             // };

//             // List<Manufacturer> manufacturersNoteBook = new(){
//             //     new Manufacturer(){  Name = "Realtek", CompanyId = 1, Models = modelsNote},
//             //     new Manufacturer(){  Name = "DLink", CompanyId = 1},
//             //     new Manufacturer(){  Name = "TPLink", CompanyId = 1},
//             //     new Manufacturer(){  Name = "Intel", CompanyId = 1},
//             // };

//             // List<Segment> segments = new(){
//             //     new Segment(){  Name = "Servidores", CompanyId = 1, Manufacturers = null},
//             //     new Segment(){  Name = "Desktop", CompanyId = 1, Manufacturers = null},
//             //     new Segment(){  Name = "Notebook", CompanyId = 1, Manufacturers = manufacturersNoteBook},
//             // };

//             //    List<Manufacturer> manufacturersNoteBook = new(){
//             //             new Manufacturer(){  Name = "Realtek", CompanyId = 1},
//             //             new Manufacturer(){  Name = "DLink", CompanyId = 1},
//             //             new Manufacturer(){  Name = "TPLink", CompanyId = 1},
//             //             new Manufacturer(){  Name = "Intel", CompanyId = 1},
//             //         };




//             return productType;
//         }
//         public ProductType NetAdapter2()
//         {

//             List<Model> models2 = new(){
//                 new Model(){  Name = "RTL-8139", CompanyId = 1, Description = "Taxa de Transferência: 10/100/1000 Mbps" },
//             };

//             List<Manufacturer> manufacturers2 = new(){
//                 new Manufacturer(){  Name = "Realtek", CompanyId = 1, Models = models2},
//             };

//             List<Segment> segments2 = new(){
//                 new Segment(){  Name = "Desktop", CompanyId = 1, Manufacturers = manufacturers2},
//             };

//             var productType = new ProductType()
//             {
//                 Id = 1,
//                 CompanyId = 1,
//                 Name = "Placas de rede",
//                 Segments = segments2,
//             };
//             return productType;

//         }



//     }
// }