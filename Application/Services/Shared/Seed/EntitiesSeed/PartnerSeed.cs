using System;
using System.Collections.Generic;
using System.Linq;
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
                Address = new(
                        "31130610",
                        "Descalvado",
                        "312",
                        "Renascença",
                        "Belo Horizonte",
                        "MG",
                        "Loja 03"
                    ),
                Contact = new(
                        "contato@minastechdistribuidora.com.br",
                            "minastechdistribuidora.com.br",
                            "",
                            "3136571043",
                            "3136571043",
                            new SocialNetwork("Instagram", "https://www.instagram.com/minastech.distribuidora/")
                    ),
                PartnerBusiness = PartnerBusinessEnum.HardwareSupplier,
                PhysicallyMovingCosts = new(20, 28, 18, 22),
                PaymentsData = new PaymentData()
                {
                    Pixes = new(){
                    new PartnerPaymentPix() { Key = "CNPJ", Value = "39305689000106" }
                },
                    Others = null,
                    Money = true,
                    BanksAccounts = null,
                }
            };

            return partner;

        }
        private Partner OficinaDosBits()
        {

            List<SocialNetwork> socialMedias = new(){
                new SocialNetwork(){Name = "Instagram", Url ="https://www.instagram.com/oficinadosbits/"},
                new SocialNetwork(){Name = "Facebook", Url ="https://www.facebook.com/oficinadosbits"},
                new SocialNetwork(){Name = "Twitter", Url ="https://twitter.com/oficinadosbits"},
                new SocialNetwork(){Name = "Youtube", Url ="https://www.youtube.com/c/oficinadosbits"},
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
                Address = new(
                        "30112020",
                        "Av. Getulio Vargas",
                        "446",
                        "Funcionarios",
                        "Belo Horizonte",
                        "MG",
                        "LOJA  1 SALA  401 SALA  403 SALA  502  SALA  503"
                    ),
                Contact = new(
                        "vendas@oficinadosbits.com.br",
                            "https://www.oficinadosbits.com.br/",
                            "31995561300",
                            "31995561300",
                            "3132820082",
                            socialMedias
                    ),
                PartnerBusiness = PartnerBusinessEnum.HardwareSupplier,
                PhysicallyMovingCosts = new(20, 28, 18, 22),
                PaymentsData = new PaymentData()
                {
                    Pixes = new(){
                    new PartnerPaymentPix() { Key = "CNPJ", Value = "02593449000136" }
                },
                    Others = null,
                    Money = true,
                    BanksAccounts = null,
                }
            };

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
                Address = new(
                        "30285110",
                        "Rua Conde D'Eu",
                        "957",
                        "Saudade",
                        "Belo Horizonte",
                        "MG",
                        null
                    ),
                Contact = new(
                        "marcelosaintclair@yahoo.com.br",
                            null,
                            "31997206461",
                            "31997206461",
                            null,
                             new SocialNetwork()
                    ),
                PartnerBusiness = PartnerBusinessEnum.Transporter,
                PhysicallyMovingCosts = new(0, 0, 0, 0),
                PaymentsData = new PaymentData()
                {
                    Pixes = new(){
                    new PartnerPaymentPix() { Key = "CPF", Value = "09903698623" }
                },
                    Others = null,
                    Money = true,
                    BanksAccounts = null,
                }
            };

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
                Address = new(
                                   "30720320",
                                   "Rua Progresso",
                                   "1063",
                                   "Padre Eustáquio",
                                   "Belo Horizonte",
                                   "MG",
                                   null
                               ),
                Contact = new(
                                   "heroondm@hotmail.com",
                                       null,
                                       "31995004198",
                                       "31995004198",
                                       null,
                                       new SocialNetwork()
                               ),
                PartnerBusiness = PartnerBusinessEnum.ElectronicRepair,
                PhysicallyMovingCosts = new(0, 0, 0, 0),
                PaymentsData = new PaymentData()
                {
                    Pixes = new(){
                    new PartnerPaymentPix() { Key = "CEL", Value = "31995004198" }
                },
                    Others = null,
                    Money = true,
                    BanksAccounts = null,
                }
            };


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