using Microsoft.EntityFrameworkCore;
using Domain.Entities;
using Domain.Entities.Shared;
using Repository.Data.RelationshipEntities;
using Domain.Entities.BudgetBench;
using Domain.Entities.Financial;

namespace Repository.Data.Context
{

    public class SonnyDbContext : DbContext
    {
        //GENERAL
        public DbSet<Address> Addresses { get; set; }

        public DbSet<Company> Companies { get; set; }
        public DbSet<Contact> Contacts { get; set; }
        public DbSet<SocialNetwork> socialnetworks { get; set; }
        //Internal


        public DbSet<Partner> Partners { get; set; }
        public DbSet<CollectDeliver> CollectsDelivers { get; set; }

        #region Budget-Bench
        public DbSet<ServiceBudget> ServicesBudgets { get; set; }
        public DbSet<SolutionPrice> SolutionsPrices { get; set; }
        public DbSet<ServiceBench> ServicesBench { get; set; }
        #endregion

        #region Financial
        public DbSet<CheckingAccount> CheckingAccounts { get; set; }
        public DbSet<FinancingLoan> FinancingsLoans { get; set; }
        public DbSet<TypePayment> TypesPayments { get; set; }
        public DbSet<EssentialExpense> EssentialsExpenses { get; set; }
        #endregion


        public DbSet<Equipament> Equipaments { get; set; }

        public DbSet<EletronicRepair> EletronicsRepairs { get; set; }


        public DbSet<Inventory> Inventories { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<NetworkDevice> NetworkDevices { get; set; }
        public DbSet<OsRemoveEquipament> OsRemoveEquipament { get; set; }

        public SonnyDbContext()
        {

        }
        public SonnyDbContext(DbContextOptions<SonnyDbContext> opt) : base(opt)
        { }



        protected override void OnModelCreating(ModelBuilder builder)
        {

            builder.ApplyConfiguration(new ServiceBudgetFluentApi());
            builder.ApplyConfiguration(new ServiceBenchFluentApi());

            builder.ApplyConfiguration(new CollectDeliverFluentApi());

            builder.ApplyConfiguration(new CheckingAccountFluentApi());

            // builder.ApplyConfiguration(new SupplierTypePaymentFluentApi());

            // builder.ApplyConfiguration(new DestinyCollectDeliverFluentApi());
            // builder.ApplyConfiguration(new SourceCollectDeliverFluentApi());
            //     builder.ApplyConfiguration(new PartnerFluentApi());
            // builder.ApplyConfiguration(new ClientEntityFluentApi());


            // builder.Entity<SupplierTypePayment>().HasKey(_SP => new { _SP.SupplierId, _SP.TypePaymentId });


            // builder.Entity<SupplierTypePayment>().HasKey(_tp => new { _tp.SupplierId, _tp.TypePaymentId });

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
                        Street = "R. Padre Rolim",
                        Number = "123",
                        District = "Santa Efigênia",
                        City = "Belo Horizonte",
                        State = "MG",
                        Complement = "",
                    },
                new Address()
                {
                    Id = 2,
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
                    Id = 3,
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
                    Id = 4,
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
                    Id = 5,
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
                    Id = 6,
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
                     Id = 7,
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
            builder.Entity<Equipament>().HasData(
                 new Equipament()
                 {
                     Id = 1,
                     Name = "Processadores"
                 },
                 new Equipament()
                 {
                     Id = 2,
                     Name = "Memórias"
                 },
                 new Equipament()
                 {
                     Id = 3,
                     Name = "Armazenamento"
                 },
                 new Equipament()
                 {
                     Id = 4,
                     Name = "Fonte"
                 },
                 new Equipament()
                 {
                     Id = 5,
                     Name = "Placa Mãe"
                 },
                 new Equipament()
                 {
                     Id = 6,
                     Name = "Monitor"
                 },
                 new Equipament()
                 {
                     Id = 7,
                     Name = "Teclado"
                 },
                 new Equipament()
                 {
                     Id = 8,
                     Name = "Mouse"
                 }
                 ,
                 new Equipament()
                 {
                     Id = 9,
                     Name = "Cooler"
                 },
                 new Equipament()
                 {
                     Id = 10,
                     Name = "Placa de Video"
                 }
                 ,
                 new Equipament()
                 {
                     Id = 11,
                     Name = "Placa de rede"
                 }
                 ,
                 new Equipament()
                 {
                     Id = 12,
                     Name = "Adaptador"
                 }
                 );




            builder.Entity<Partner>().HasData(
               new Partner()
               {
                   Id = 1,
                   Name = "BaseDeTroca",

                   Today = System.DateTime.Now,
                   CNPJ = "",
                   Responsible = "Marcus Vinícius Dias",
                   Comments = "",
                   Transporter = false,
                   Supplier = false,
                   BusinessLine = "Desenvolvimento de softwares e supporte a redes",
                   AddressId = 4,
                   ContactId = 4,

               },
               new Partner()
               {
                   Id = 2,
                   Name = "Oppen Informática",
                   Today = System.DateTime.Now,
                   CNPJ = "",
                   Responsible = "Juliano",
                   Comments = "",
                   Transporter = false,
                   Supplier = true,
                   BusinessLine = "Venda de hardware",
                   AddressId = 4,
                   ContactId = 4,




               },
               new Partner()
               {
                   Id = 3,
                   Name = "Oficina dos Bits",
                   Today = System.DateTime.Now,
                   CNPJ = "",
                   Responsible = "Claudio Nogueira",
                   Comments = "",
                   Transporter = false,
                   Supplier = true,
                   BusinessLine = "Venda de hardware",
                   AddressId = 4,
                   ContactId = 4,

               },

                           new Partner()
                           {
                               Id = 4,
                               Name = "Perfect print",
                               Today = System.DateTime.Now,
                               CNPJ = "",
                               Responsible = "Luiz Junior",
                               Comments = "",
                               BusinessLine = "Assistência técnica, aluguel e venda de periféricos e impressoras",
                               AddressId = 5,
                               ContactId = 5,

                           },
                             new Partner()
                             {
                                 Id = 5,
                                 Name = "Marcelinho Motoca",
                                 Today = System.DateTime.Now,
                                 CNPJ = "",
                                 Transporter = true,
                                 Supplier = false,
                                 Responsible = "Marcelo Duarte",
                                 Comments = "De confiança!",
                                 BusinessLine = "Motoboy faz e desfaz qualquer treta!",
                                 AddressId = 6,
                                 ContactId = 6,

                             }
                       );

            // builder.Entity<SupplierTypePayment>().HasData(
            //                new SupplierTypePayment()
            //                {
            //                    SupplierId = 1,
            //                    TypePaymentId = 1
            //                },
            //                new SupplierTypePayment()
            //                {

            //                    SupplierId = 1,
            //                    TypePaymentId = 2
            //                },
            //                new SupplierTypePayment()
            //                {

            //                    SupplierId = 2,
            //                    TypePaymentId = 1
            //                },
            //                new SupplierTypePayment()
            //                {

            //                    SupplierId = 2,
            //                    TypePaymentId = 2
            //                },
            //                new SupplierTypePayment()
            //                {

            //                    SupplierId = 2,
            //                    TypePaymentId = 3
            //                },
            //                new SupplierTypePayment()
            //                {

            //                    SupplierId = 2,
            //                    TypePaymentId = 4
            //                }
            //            );

        }
    }

}