using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain.Entities.Main.Customers;
using Domain.Entities.Main.Enums;
using Domain.Entities.Shared;
using Repository.Data.Context;

namespace Repository.Data.Operations.Seed.EntitiesSeed
{
    public class CustomerSeed_NSTI
    {

        private readonly SonnyDbContext _context;
        public CustomerSeed_NSTI(SonnyDbContext context)
        {
            _context = context;
        }
        
        public Customer MinasArCompressores()
        {
            List<SocialNetwork> socialMedias = new(){
                new SocialNetwork(){Name = "Instagram", Url ="compressoresminasar"},
                new SocialNetwork(){Name = "Facebook", Url ="https://www.facebook.com/profile.php?id=100063570278549&mibextid=ZbWKwL"},
            };

            Customer customer = new(1,
                  "Minas Ar Compressores",
                     "Wellington Batista",
                     "13495178000100",
                     new DateTime(),
                    @"A Minas Ar Compressores atua no fornecimento de energias alternativas para movimentar equipamentos especiais com foco nos segmentos de infraestrutura, construção civil, indústria, eventos, óleo & gás, mineração, agronegócio, usinas termelétricas e comércio & serviços.
                        A Minas Ar Compressores tem como objetivo oferecer ao mercado e a seus clientes a mais completa linha de produtos relacionados a soluções de ar comprimido, tais como: compressores de parafuso, estacionários e portáteis, secadores de ar, filtros coalescentes, reservatórios (pulmões) de ar, rede de ar e instalações de centrais de ar comprimido.
                        Sempre perto de você, a Minas Ar Compressores tem como diferencial a assistência técnica 24h, disponibilizando equipes de profissionais experientes e técnicos qualificados.",
                     "Assistência Técnica",
                        new(
                            "31255190",
                            "Rua Estoril",
                            "1611",
                            "São Francisco",
                            "Belo Horizonte",
                            "MG",
                            null
                            ),
                        new(
                            "comercial@minasarcompressores.com.br",
                            "minasarcompressores.com.br",
                            "31984194408",
                            "31984194408",
                            "3125510021",
                            socialMedias
                            ),
                     true,
                     600,
                     10,
                     false,
                     0,
                     new(150),
                      EntityTypeEnum.PJ,
                     new(20, 50, 18, 25)
            );

            return customer;


        }
        public Customer ArcAr()
        {

            List<SocialNetwork> socialMedias = new(){
                new SocialNetwork(){Name = "Instagram", Url ="arc_arcondicionado"},
            };

            Customer customer = new(1,
                    "ARC AR CONDICIONADO LTDA",
                     "Alexandre",
                     "12920789000188",
                     new DateTime(),
                    @"Atuamos na área de climatização de ambientes desde 2010, prestando serviços de instalação, manutenção preventiva e/ou corretiva, consultoria e projetos.
                      Objetivando a satisfação de nossos clientes oferecemos serviços personalizados, de alto padrão técnico e de qualidade.
                      Nossos técnicos são experientes e qualificados através da educação continuada realizada junto aos fabricantes do setor e aos melhores centros de treinamento em refrigeração.",
                     "Instalação / Assistência Técnica / Consultoria e projetos",
                        new(
                            "30285270",
                            "Itamirim",
                            "280",
                            "Vera Cruz",
                            "Belo Horizonte",
                            "MG",
                            null
                            ),
                        new(
                            "renata@brisaambientes.com.br",
                            "http://arcarcondicionado.com.br/",
                            "31984194408",
                            "31984194408",
                            "3135463081",
                            socialMedias
                           ),
                     true,
                     250,
                     10,
                     false,
                     0,
                     new(0),
                     EntityTypeEnum.PJ,
                     new(5, 10, 0, 10)
            );

            return customer;


        }
        public Customer Medrado()
        {

            List<SocialNetwork> socialMedias = new(){
                new SocialNetwork(){Name = "Instagram", Url ="medradoadvogados"},
                new SocialNetwork(){Name = "Facebook", Url ="https://www.facebook.com/medradoadvogados"},
            };

            Customer customer = new(1,
                    "MEDRADO SOCIEDADE DE ADVOGADOS",
                     "Bruno Medrado",
                     "38407737000104",
                     new DateTime(),
                    @"Escritório de Advocacia
                        Medrado Advogados
                        Atuação em todas as áreas.
                        Fundado em 1986.",
                     "Advocacia / Direito",
                        new(
                            "30180099",
                            "Dos Guajajaras",
                            "1470",
                            "Barro preto",
                            "Belo Horizonte",
                            "MG",
                            "10º ANDAR - SALA  1004"
                            ),
                        new(
                            "contato@medradoadvogados.com.br",
                            "medradoadvogados.com.br",
                            "3132929933",
                            "3132929933",
                            "3132929933",
                            socialMedias
                           ),
                     true,
                     200,
                     10,
                     false,
                     0,
                     new(90),
                       EntityTypeEnum.PJ,
                     new(20, 35, 9, 25)
            );
            return customer;
        }
        public Customer Crs()
        {

            List<SocialNetwork> socialMedias = new(){
                new SocialNetwork(){Name = "Instagram", Url ="comercialrosasantos"},
                new SocialNetwork(){Name = "Facebook", Url ="https://www.facebook.com/comercialrosasantoss"},
            };

            Customer customer = new(1,
                    "COMERCIAL ROSA SANTOS LTDA",
                     "Dora",
                     "14302611000107",
                     new DateTime(),
                    @"A Comercial Rosa Santos é uma empresa no ramo de distribuição de produtos de limpeza, higiene, descartáveis e outros produtos complementares a estes.
                    A empresa está inserida no mercado desde 2011 com sede em Belo Horizonte e com atuação comercial atacadista. Atendemos em todo o território nacional.",
                     "Distribuidora / Produtos de limpeza",
                        new(
                            "30620270",
                            "Maringa",
                            "25",
                            "Milionarios (Barreiro)",
                            "Belo Horizonte",
                            "MG",
                            "Galpão"
                            ),
                        new(
                            "vendas@comercialrosasantos.com.br",
                            "https://comercialrosasantos.com.br/",
                            "31986347045",
                            "31986347045",
                            "3125126346",
                            socialMedias
                           ),
                     true,
                     220,
                     10,
                     false,
                     0,
                     new(100),
                       EntityTypeEnum.PJ,
                     new(35, 50, 18, 30)
            );

            return customer;
        }
        public Customer Inovagro()
        {

            List<SocialNetwork> socialMedias = new(){
                new SocialNetwork(){Name = "Instagram", Url ="grupoinovagro"},
            };

            Customer customer = new(1,
                    "INOVAGRO PREPAROS E LOCACOES LTDA",
                     "Rodrigo Duarte",
                     "19448662000157",
                     new DateTime(),
                    @"Atuamos no mercado de locação de máquinas pesadas no Brasil. 
                    Desenvolvemos técnicas de aperfeiçoamento no trabalho.",
                     "Distribuidora / Produtos de limpeza",
                        new(
                            "31330000",
                            "Altamiro Avelino Soares",
                            "342",
                            "Castelo",
                            "Belo Horizonte",
                            "MG",
                            "Sala 403"
                            ),
                        new(
                            "administrativomg@grupoinovagro.com.br",
                            null,
                            "31995330359",
                            "31995330359",
                            "3134813727",
                            socialMedias
                           ),
                     true,
                     250,
                     10,
                     false,
                     0,
                     new(100),
                       EntityTypeEnum.PJ,
                     new(35, 50, 18, 30)

            );

            return customer;
        }
        public Customer VipTotalTextil()
        {

            List<SocialNetwork> socialMedias = new(){
                new SocialNetwork(){Name = "Instagram", Url ="totaltextil"},
            };

            Customer customer = new(1,
                    "VIP TEXTIL K LTDA",
                     "Nikolas",
                     "21933500000156",
                     new DateTime(),
                    @"Somos uma empresa especializada em enxoval hospitalar e hoteleiro, localizada no bairro Santa Efigênia – Belo horizonte, fornecendo sempre produtos de alta qualidade e melhor custo benefício com o melhor prazo de entrega. Possuímos atendimento em todo território nacional.",
                     "Industria Têxtil",
                        new(
                            "30270360",
                            "Cel. Otávio Diniz",
                            "807",
                            "Santa Efigênia",
                            "Belo Horizonte",
                            "MG",
                            "Galpão"
                            ),
                        new(
                            "contato@totaltextil.com.br",
                            "https://www.totaltextil.com.br/",
                            "31994882202",
                            "988834804",
                            "3130245555",
                            socialMedias
                           ),
                     true,
                     312,
                     20,
                     false,
                     0,
                     new(80),
                       EntityTypeEnum.PJ,
                     new(8, 12, 0, 10)
            );

            return customer;


        }
        public Customer PinheiroMoraisHoskenAdvocacia()
        {

            List<SocialNetwork> socialMedias = new(){
                new SocialNetwork(){Name = "Instagram", Url ="https://www.instagram.com/pmehadvocacia/"},
                new SocialNetwork(){Name = "Facebook", Url ="https://pt-br.facebook.com/pmehadv"},
            };

            Customer customer = new(1,
                    "PINHEIRO DE MORAIS E HOSKEN ADVOCACIA",
                     "Rodrigo / Luiz",
                     "08947045000180",
                     new DateTime(),
                        @"Há mais de 17 anos, Pinheiro de Morais & Hosken Advocacia convive diariamente com as diversas situações relacionadas à atividade empresarial, com participação ativa nas decisões de seus clientes.
                        Essa trajetória possibilitou ao escritório PM&H profundo conhecimento e atuação em várias áreas jurídicas, notadamente no Direito da Construção, Trabalhista de Obras e Negócios Imobiliários, tornando-o expert neste setor, contando com um time preparado e envolvido.
                        Nossa experiência revela que uma atuação próxima, contínua e disponível propicia a ampla compreensão das reais necessidades do cliente, o que assegura a adoção das melhores estratégias e soluções.
                        Com um modelo de atuação voltado para o apoio consultivo constante, exercemos de forma efetiva o Direito Preventivo, promovendo a redução de riscos, litígios e custos aos clientes, permitindo que estes foquem naquilo que mais entendem: seu próprio negócio.
                        Empregamos todos os esforços para que sejamos reconhecidos como um investimento que contribui para o crescimento das empresas e novos negócios.
                        Atuando de forma preventiva e contenciosa, buscamos compreender as particularidades de cada cliente, em prol de um atendimento personalíssimo.
                        Esta forma diferenciada de atendimento possibilita o conhecimento da atividade desenvolvida pelo cliente, nos concedendo uma ampla visão, capaz de apresentar as mais adequadas medidas jurídicas ao cotidiano empresarial.
                        Assim, estribados na ética, transparência e honestidade, investimos em inovações para satisfazer as necessidades e expectativas dos nossos clientes.",
                     "Advocacia / Direito",
                        new(
                            "30494170",
                            "Raja gabaglia",
                            "2000",
                            "ALPES",
                            "Belo Horizonte",
                            "MG",
                            "Sala 818"
                            ),
                        new(
                            "contato@pmeh.com.br",
                            "https://www.pmeh.com.br/",
                            "3192879402",
                            "3132612355",
                            "3132612355",
                            socialMedias
                           ),
                     true,
                     320,
                     10,
                     false,
                     0,
                     new(100),
                       EntityTypeEnum.PJ,
                     new(20, 35, 9, 25)
            );

            return customer;

        }
        public Customer LaenderviannaSociedadeAdvogados()
        {
            Customer customer = new(1,
                    "LAENDER & VIANNA SOCIEDADE DE ADVOGADOS",
                     "Lucas / Rafael",
                     "13703366000179",
                     new DateTime(),
                        @"A Laender & Vianna Sociedade de Advogados é uma sociedade fundada em 2011, formada por profissionais que, como principais pilares na prestação de seus serviços jurídicos, prezam pela a eficiência, transparência e comprometimento com o cliente.
                          A sociedade tem como propósito fundamental viabilizar solução de problemas jurídicos e apoio integral aos seus clientes, utilizando o que existe de mais moderno em tecnologia para garantir que o trabalho seja prestado de maneira personalizada e eficiente.
                          Vislumbra no comprometimento e no trabalho em equipe, além da constante atualização, a oportunidade de superar as expectativas dos clientes, analisando e identificando as necessidades específicas de cada caso.",
                     "Advocacia / Direito",
                        new(
                            "30130090",
                            "Padre rolim",
                            "123",
                            "Santa Efigenia",
                            "Belo Horizonte",
                            "MG",
                            "Sala 501"
                            ),
                        new(
                            "lucas.laender@laendervianna.com.br, rafael.vianna@laendervianna.com.br",
                            "http://laendervianna.com.br/",
                            "31983997479",
                            "3125162327",
                            "3125162327",
                            new SocialNetwork()
                           ),
                     true,
                     320,
                     10,
                     false,
                     0,
                     new(80),
                       EntityTypeEnum.PJ,
                     new(15, 20, 9, 20)
            );




            return customer;


        }
        public Customer ClinicaOftam()
        {
            Customer customer = new(1,
                    "ANDRE VIANNA PESSOA DE MENDONCA",
                     "Andre / Andrea",
                     "16242092620",
                     new DateTime(),
                        @"Oftalmologista",
                     "Medicina Saúde",
                        new(
                            "30150221",
                            "Francisco Sales",
                            "1420",
                            "Santa Efigenia",
                            "Belo Horizonte",
                            "MG",
                            "Sala 501"
                            ),
                        new(
                            "aviannapdem@yahoo.com.br, andreviannaoftalmo@gmail.com",
                            "http://laendervianna.com.br/",
                            "31999671876",
                            "31982131560",
                            "312819800",
                            new SocialNetwork()
                           ),
                     true,
                     600,
                     10,
                     false,
                     0,
                     new(0),
                      EntityTypeEnum.PJ,
                     new(15, 20, 9, 20)
            );




            return customer;


        }

        public void AddSaveAllAsync()
        {
             _context.AddRangeAsync(
            MinasArCompressores(),
            ArcAr(),
            Medrado(),
            Crs(),
            Inovagro(),
            VipTotalTextil(),
            PinheiroMoraisHoskenAdvocacia(),
            LaenderviannaSociedadeAdvogados(),
            ClinicaOftam()
            );
        }

    }
}