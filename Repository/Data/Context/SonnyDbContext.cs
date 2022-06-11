using Microsoft.EntityFrameworkCore;
using Domain.Entities;
using System.Collections.Generic;

namespace Repository.Data.Context
{

    public class SonnyDbContext : DbContext
    {
        //GENERAL
        public DbSet<Address> Addresses { get; set; }
        public DbSet<Contact> Contacts { get; set; }
        public DbSet<SocialNetwork> socialnetworks { get; set; }
        //Internal
        public DbSet<DailyInFlow> DailyInFlows { get; set; }
        public DbSet<DailyOutFlow> DailyOutFlows { get; set; }

        public DbSet<MonthlyOutFlow> MonthlyOutFlows { get; set; }

        public DbSet<Partner> Partners { get; set; }
        public DbSet<CollectDeliver> CollectsDelivers { get; set; }

        public DbSet<EletronicRepair> EletronicsRepairs { get; set; }
        public DbSet<ServiceBudget> ServicesBudgets { get; set; }

        public DbSet<TypePayment> TypesPayments { get; set; }
        public DbSet<Item> Items { get; set; }
        public DbSet<CheckingAccount> CheckingAccounts { get; set; }
        public DbSet<Card> Cards { get; set; }
        public DbSet<Supplier> Suppliers { get; set; }
        public DbSet<SupplierTypePayment> SuppliersTypesPayments { get; set; }
        public DbSet<Inventory> Inventories { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<SubCategory> SubCategories { get; set; }

        //CLIENTS
        public DbSet<ClientEntity> Clients { get; set; }
        public DbSet<NetworkDevices> NetworkDevices { get; set; }
        public DbSet<BusinessBox> BusinessBoxes { get; set; }
        public DbSet<OsRemoveEquipament> OsRemoveEquipament { get; set; }


        // public DbSet<NetGenericsOptions> NetGenericsOptions { get; set; }

        public SonnyDbContext()
        {

        }
        public SonnyDbContext(DbContextOptions<SonnyDbContext> opt) : base(opt)
        { }



        protected override void OnModelCreating(ModelBuilder builder)
        {


            builder.Entity<SupplierTypePayment>().HasKey(_SP => new { _SP.SupplierId, _SP.TypePaymentId });


            builder.Entity<SupplierTypePayment>()
            .HasKey(_tp => new { _tp.SupplierId, _tp.TypePaymentId });

            builder.Entity<TypePayment>().HasData(
                  new TypePayment()
                  {
                      Id = 1,
                      Name = "Dinheiro",
                      Description = "Pagamento em espécie.",
                  },
                  new TypePayment()
                  {
                      Id = 2,
                      Name = "Pix",
                      Description = "",
                  },
                  new TypePayment()
                  {
                      Id = 3,
                      Name = "Débito",
                      Description = "Débito",
                  },
                  new TypePayment()
                  {
                      Id = 4,
                      Name = "Credito",
                      Description = "Credito",
                  }
            );
            builder.Entity<Address>().HasData(
                new Address()
                {
                    Id = 1,
                    ZipCode = "31255-080",
                    Street = " R. Pôrto",
                    Number = "659",
                    District = "São Francisco",
                    City = "Belo Horizonte",
                    State = "MG",
                    Complement = "",
                },
                new Address()
                {
                    Id = 2,
                    ZipCode = "31255-080",
                    Street = "R. Padre Rolim",
                    Number = "123",
                    District = "Santa Efigênia",
                    City = "Belo Horizonte",
                    State = "MG",
                    Complement = "",
                },
                new Address()
                {
                    Id = 3,
                    ZipCode = "31015-172",
                    Street = " R. Curvelo",
                    Number = "32",
                    District = "Floresta",
                    City = "Belo Horizonte",
                    State = "MG",
                    Complement = " sala 801",
                },
                new Address()
                {
                    Id = 4,
                    ZipCode = "30112-020",
                    Street = "Av. Getúlio Vargas",
                    Number = "446",
                    District = "Funcionários",
                    City = "Belo Horizonte",
                    State = "MG",
                    Complement = "",
                },
                new Address()
                {
                    Id = 5,
                    ZipCode = "30280-520",
                    Street = "R. Veredinha",
                    Number = "95",
                    District = "Pompéia",
                    City = "Belo Horizonte",
                    State = "MG",
                    Complement = "",
                },
                new Address()
                {
                    Id = 6,
                    ZipCode = "98989-4856",
                    Street = "R. Camanducaia",
                    Number = "4678",
                    District = "Horizontes",
                    City = "Belo Horizonte",
                    State = "MG",
                    Complement = "",
                },
                new Address()
                {
                    Id = 7,
                    ZipCode = "-------------",
                    Street = "-------------",
                    Number = "-------------",
                    District = "-------------",
                    City = "-------------",
                    State = "-------------",
                    Complement = "",
                },
                 new Address()
                 {
                     Id = 8,
                     ZipCode = "30620-270",
                     Street = " R. Maringá",
                     Number = "25",
                     District = "Milionários",
                     City = "Belo Horizonte",
                     State = "MG",
                     Complement = "",
                 }
            );
            builder.Entity<Contact>().HasData(
                new Contact()
                {
                    Id = 1,
                    Email = "comercial@minasarcompressores.com.br",
                    Cel = "(31) 9-8419-4408",
                    Zap = "(31) 9-8419-4408",
                    Landline = "(31) 2551-0021",
                    //  socialnetworks = MinasAr
                },
                 new Contact()
                 {
                     Id = 2,
                     Email = "lucas@laenderevianna.com.br",
                     Cel = "(31) 9-8859-8734",
                     Zap = "(31) 9-8859-8734",
                     Landline = "(31) 2516-2327",
                     // socialnetworks = Lvsa
                 },
                 new Contact()
                 {
                     Id = 3,
                     Email = "oppen@oppeninformatica.com.br",
                     Cel = "(31) 9-9851-1532",
                     Zap = "(31) 9-9851-1532",
                     Landline = "(31) 3234-4661",
                     //    socialnetworks = Oppen
                 },
                 new Contact()
                 {
                     Id = 4,
                     Email = "oppen@oppeninformatica.com.br",
                     Cel = "(31) 9-9851-1532",
                     Zap = "(31) 9-9851-1532",
                     Landline = "(31) 3234-4661",
                     //  socialnetworks = Oppen
                 },
                 new Contact()
                 {
                     Id = 5,
                     Email = "comercial@perfectprint.com.br",
                     Cel = "(31) 9-8553-2934",
                     Zap = "(31) 9-8553-2934",
                     Landline = "(31) 3272-7620",
                     // socialnetworks = PerfectPrint
                 },
                 new Contact()
                 {
                     Id = 6,
                     Email = "marcelo@marcelomotoca.com.br",
                     Cel = "(31) 9-9999-9999",
                     Zap = "(31) 9-9999-9999",
                     Landline = "(31) 9999-9999",
                     //     socialnetworks = MarceloMotoca
                 },
                 new Contact()
                 {
                     Id = 7,
                     Email = "-------------",
                     Cel = "-------------",
                     Zap = "-------------",
                     Landline = "-------------",
                 },
                 new Contact()
                 {
                     Id = 8,
                     Email = "comercial@comercialrosasantos.com.br",
                     Cel = "",
                     Zap = "",
                     Landline = "(31) 2512-6346",
                     // socialnetworks = Crs
                 }
        );
            builder.Entity<Category>().HasData(
                 new Category()
                 {
                     Id = 1,
                     Name = "Processadores"
                 },
                 new Category()
                 {
                     Id = 2,
                     Name = "Memórias"
                 },
                 new Category()
                 {
                     Id = 3,
                     Name = "Armazenamento"
                 },
                 new Category()
                 {
                     Id = 4,
                     Name = "Fonte"
                 },
                 new Category()
                 {
                     Id = 5,
                     Name = "Placa Mãe"
                 },
                 new Category()
                 {
                     Id = 6,
                     Name = "Monitor"
                 },
                 new Category()
                 {
                     Id = 7,
                     Name = "Teclado"
                 },
                 new Category()
                 {
                     Id = 8,
                     Name = "Mouse"
                 }
                 ,
                 new Category()
                 {
                     Id = 9,
                     Name = "Cooler"
                 },
                 new Category()
                 {
                     Id = 10,
                     Name = "Placa de Video"
                 }
                 ,
                 new Category()
                 {
                     Id = 11,
                     Name = "Placa de rede"
                 }
                 ,
                 new Category()
                 {
                     Id = 12,
                     Name = "Adaptador"
                 }
                 );




            builder.Entity<Supplier>().HasData(
                new Supplier()
                {
                    Id = 1,
                    Name = "BaseDeTroca",
                    Seller = "....",
                    AddressId = 7,
                    ContactId = 7,
                    SuppliersTypesPayments = null,
                    ToSeach = "Origem " + "desconhecida"

                },
                new Supplier()
                {
                    Id = 2,
                    Name = "Oppen Informática",
                    Seller = "Juliano",
                    AddressId = 3,
                    ContactId = 3,
                    SuppliersTypesPayments = null,
                    ToSeach = "Oppen Informática " + "Juliano"

                },
                new Supplier()
                {
                    Id = 3,
                    Name = "Oficina dos Bits",
                    Seller = "Leonardo",
                    AddressId = 4,
                    ContactId = 4,
                    SuppliersTypesPayments = null,
                    ToSeach = "Oficina dos Bits " + "Leonardo"
                }
            );
            builder.Entity<Partner>().HasData(
                           new Partner()
                           {
                               Id = 1,
                               Name = "Perfect print",
                               Today = System.DateTime.Now,
                               CNPJ = "",
                               Responsible = "Luiz Junior",
                               Comments = "",
                               BusinessLine = "Assistência técnica, aluguel e venda de periféricos e impressoras",
                               AddressId = 5,
                               ContactId = 5,
                               ToSeach = "Perfect print " + "Luiz Junior"
                           },
                             new Partner()
                             {
                                 Id = 2,
                                 Name = "Marcelinho Motoca",
                                 Today = System.DateTime.Now,
                                 CNPJ = "",
                                 Responsible = "Marcelo Duarte",
                                 Comments = "De confiança!",
                                 BusinessLine = "Motoboy faz e desfaz qualquer treta!",
                                 AddressId = 6,
                                 ContactId = 6,
                                 ToSeach = "Perfect print " + "Luiz Junior"
                             }
                       );

            builder.Entity<SupplierTypePayment>().HasData(
                           new SupplierTypePayment()
                           {
                               SupplierId = 1,
                               TypePaymentId = 1
                           },
                           new SupplierTypePayment()
                           {

                               SupplierId = 1,
                               TypePaymentId = 2
                           },
                           new SupplierTypePayment()
                           {

                               SupplierId = 2,
                               TypePaymentId = 1
                           },
                           new SupplierTypePayment()
                           {

                               SupplierId = 2,
                               TypePaymentId = 2
                           },
                           new SupplierTypePayment()
                           {

                               SupplierId = 2,
                               TypePaymentId = 3
                           },
                           new SupplierTypePayment()
                           {

                               SupplierId = 2,
                               TypePaymentId = 4
                           }
                       );

        }
    }

}