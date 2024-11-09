using System;
using System.Collections.Generic;
using Domain.Entities.Main;
using Domain.Entities.Main.Inheritances.Enums;
using Domain.Entities.Main.Partners;
using Domain.Entities.Main.Partners.Enums;
using Domain.Entities.Shared;

namespace Application.Services.Shared.Seed.EntitiesSeed
{
    public class PartnerSeed_NSTI
    {
        private Partner MinasTech()
        {
            Partner partner = new()
            {
                CompanyId = 1,
                Name = "MINAS TECH INFORMATICA SUPRIMENTOS E SERVICOS LTDA",
                Responsible = "Patricia",
                CNPJ = "39305689000106",
                EntityType = EntityTypeEnum.PJ,
                Registered = new DateTime(),
                Description = @"Minas Tech Distribuidora é uma empresa mineira de destaque no ramo de distribuição de produtos de informática, acumulando quatro anos de sólida experiência no mercado. Nossa expertise nos permite atender com excelência e eficiência às demandas dos nossos clientes.
                    Com um amplo e diversificado estoque de peças, estamos preparados para suprir todas as necessidades tecnológicas de nossos clientes. Além disso, oferecemos a praticidade do nosso e-commerce, bem como a comodidade da nossa loja física, estrategicamente situada em Belo Horizonte/MG.
                    Atingimos clientes em todo o Brasil, entregando nossos produtos com agilidade e garantindo a máxima qualidade em cada envio. Trabalhamos exclusivamente com produtos de primeira linha, assegurando que nossos clientes tenham acesso ao que há de mais moderno e inovador no mercado.",

                BusinessLine = "Distribuidora Hadware",
                Address = new()
                {

                    ZipCode = "31130610",
                    Street = "Descalvado",
                    Number = "312",
                    District = "Renascença",
                    City = "Belo Horizonte",
                    State = "MG",
                    Complement = "Loja 03",
                    Registered = DateTime.Now,
                    Deleted = DateTime.MinValue,
                },
                Contact = new()
                {


                    Email = "contato@minastechdistribuidora.com.br",
                    Site = "minastechdistribuidora.com.br",
                    Cel = "",
                    Zap = "3136571043",
                    Landline = "3136571043",
                    SocialMedias = null,
                    Registered = DateTime.Now,
                    Deleted = DateTime.MinValue,

                },
                PartnerBusiness = PartnerBusinessEnum.HardwareSupplier,
                PhysicallyMovingCosts = new()
                {
                    CompanyId = 1,
                    Fuel = 20,
                    Apps = 28,
                    PublicTransport = 18,
                    MotoBoy = 22,
                },
                PaymentsData = new PaymentData()
                {
                    CompanyId = 1,
                    Pixes = new(){
                    new PartnerPaymentPix() {
                        CompanyId =1,
                        Key = "CNPJ", Value = "39305689000106" }
                },
                    Others = null,
                    Money = true,
                    BanksAccounts = null,
                }
            };

            partner.UserId = 1;
            return partner;

        }
        private Partner OficinaDosBits()
        {

            List<SocialNetwork> socialMedias = new(){
                new SocialNetwork(){
                    CompanyId = 1,
                    Name = "Instagram", Url ="https://www.instagram.com/oficinadosbits/"},
                new SocialNetwork(){
                    CompanyId = 1,
                    Name = "Facebook", Url ="https://www.facebook.com/oficinadosbits"},
                new SocialNetwork(){
                    CompanyId = 1,
                    Name = "Twitter", Url ="https://twitter.com/oficinadosbits"},
                new SocialNetwork(){
                    CompanyId = 1,
                    Name = "Youtube", Url ="https://www.youtube.com/c/oficinadosbits"},
            };

            Partner partner = new()
            {
                CompanyId = 1,
                Name = "OFICINA DOS BITS LTDA",
                Responsible = "Leonardo Vendedor",
                CNPJ = "02593449000136",
                EntityType = EntityTypeEnum.PJ,
                Registered = new DateTime(),
                Description = @"Com início de suas atividades em 1998, a Oficina dos Bits é hoje uma das mais bem conceituadas lojas de informática do Brasil. Focada em equipamentos de alta performance, oferece excelência em atendimento, garantia e procedência de todos os seus produtos, a fim de atender um público de gamers e entusiastas sempre em busca de qualidade e novidades.
                    A empresa, situada em área comercial nobre de Belo Horizonte, conta com amplo Show-Room onde o cliente, além conhecer os últimos lançamentos em tecnologia, recebe consultoria de uma equipe de vendas treinada a responder todas as dúvidas e indicar a melhor solução.
                    Pioneira no sistema de e-commerce, o site www.OficinadosBits.com.br, no ar desde 1998, é informativo, rápido e seguro, registra atualmente mais de 1 milhão de acessos mensais, gerando grande volume de vendas para todo o Brasil, apoiado por um sistema de gestão e expedição eficientes.
                    Antenada com o que há de mais moderno em tecnologia, a Oficina dos Bits está sempre em busca de novas parcerias com os melhores fabricantes, estreitando, dia-a-dia, o laço de relacionamento com os mesmos, possibilitando, além de direito a representações oficiais, negociações que interferem diretamente nos ótimos preços praticados pela empresa.",

                BusinessLine = "Distribuidora Hadware",
                Address = new()
                {

                    ZipCode = "30112020",
                    Street = "Av. Getulio Vargas",
                    Number = "446",
                    District = "Funcionarios",
                    City = "Belo Horizonte",
                    State = "MG",
                    Complement = "LOJA  1 SALA  401 SALA  403 SALA  502  SALA  503",
                    Registered = DateTime.Now,
                    Deleted = DateTime.MinValue,
                },
                Contact = new()
                {

                    Email = "vendas@oficinadosbits.com.br",
                    Site = "https://www.oficinadosbits.com.br/",
                    Cel = "31995561300",
                    Zap = "31995561300",
                    Landline = "3132820082",
                    SocialMedias = socialMedias,
                    Registered = DateTime.Now,
                    Deleted = DateTime.MinValue,
                },
                PartnerBusiness = PartnerBusinessEnum.HardwareSupplier,
                PhysicallyMovingCosts = new()
                {
                    CompanyId = 1,
                    Fuel = 20,
                    Apps = 28,
                    PublicTransport = 18,
                    MotoBoy = 22,

                },
                PaymentsData = new PaymentData()
                {
                    CompanyId = 1,
                    Pixes = new(){
                    new PartnerPaymentPix() {
                        CompanyId =1,
                        Key = "CNPJ", Value = "02593449000136" }
                },
                    Others = null,
                    Money = true,
                    BanksAccounts = null,
                }
            };

            partner.UserId = 1;
            return partner;


        }
        private Partner MarceloMotoqueiro()
        {

            Partner partner = new()
            {
                CompanyId = 1,
                Name = "Marcelo Duarte Saint Clair Junior (MotoBoy)",
                Responsible = "Marcelo",
                CNPJ = "09903698623",
                EntityType = EntityTypeEnum.PF,
                Registered = new DateTime(),
                Description = @"",
                BusinessLine = "Motoboy",
                Address = new()
                {

                    ZipCode = "30285110",
                    Street = "Rua Conde D'Eu",
                    Number = "957",
                    District = "Saudade",
                    City = "Belo Horizonte",
                    State = "MG",
                    Complement = null,
                    Registered = DateTime.Now,
                    Deleted = DateTime.MinValue,
                },
                Contact = new()
                {


                    Email = "marcelosaintclair@yahoo.com.br",
                    Site = null,
                    Cel = "31997206461",
                    Zap = "31997206461",
                    Landline = null,
                    SocialMedias = null,
                    Registered = DateTime.Now,
                    Deleted = DateTime.MinValue,
                },
                PartnerBusiness = PartnerBusinessEnum.Transporter,
                PhysicallyMovingCosts = new()
                {
                    CompanyId = 1,
                    Fuel = 0,
                    Apps = 0,
                    PublicTransport = 0,
                    MotoBoy = 0,

                },
                PaymentsData = new PaymentData()
                {
                    CompanyId = 1,
                    Pixes = new(){
                    new PartnerPaymentPix() {
                        CompanyId =1,
                        Key = "CPF", Value = "09903698623" }
                },
                    Others = null,
                    Money = true,
                    BanksAccounts = null,
                }
            };

            partner.UserId = 1;
            return partner;






        }
        private Partner HeronEletronicRepair()
        {


            Partner partner = new()
            {
                CompanyId = 1,
                Name = "Heron Domingues Reparos eletrônicos",
                Responsible = "Heron",
                CNPJ = "97066516672",
                EntityType = EntityTypeEnum.PF,
                Registered = new DateTime(),
                Description = @"",
                BusinessLine = "Reparos Eletrônicos",
                Address = new()
                {

                    ZipCode = "30720320",
                    Street = "Rua Progresso",
                    Number = "1063",
                    District = "Padre Eustáquio",
                    City = "Belo Horizonte",
                    State = "MG",
                    Complement = null,
                    Registered = DateTime.Now,
                    Deleted = DateTime.MinValue,

                },
                Contact = new()
                {

                    Email = "heroondm@hotmail.com",
                    Site = null,
                    Cel = "31995004198",
                    Zap = "31995004198",
                    Landline = null,
                    SocialMedias = null,
                    Registered = DateTime.Now,
                    Deleted = DateTime.MinValue,
                },
                PartnerBusiness = PartnerBusinessEnum.ElectronicRepair,
                PhysicallyMovingCosts = new()
                {
                    CompanyId = 1,
                    Fuel = 20,
                    Apps = 28,
                    PublicTransport = 18,
                    MotoBoy = 22,

                },
                PaymentsData = new PaymentData()
                {
                    CompanyId = 1,
                    Pixes = new(){
                    new PartnerPaymentPix() {
                        CompanyId =1,
                        Key = "CEL", Value = "31995004198" }
                },
                    Others = null,
                    Money = true,
                    BanksAccounts = null,
                }
            };


            partner.UserId = 1;
            return partner;

        }
        public List<Partner> PartnersReturn()
        {
            var par = new List<Partner>{
                    MinasTech(),
                    OficinaDosBits(),
                    MarceloMotoqueiro(),
                    HeronEletronicRepair(),
            };
            return par;
        }

    }
}