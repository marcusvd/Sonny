using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Collections.Generic;
using Pagination.Models;
using Application.Services.Operations.Main.Partners.Dtos;
using Application.Services.Operations.Main.Partners;
using System.Xml;
using System.Security.Cryptography.X509Certificates;


namespace Api.Controllers
{
    [ApiController]
    [AllowAnonymous]
    [Route("api/{controller}")]
    public class NfeController : ControllerBase
    {
        private readonly IPartnerAddServices _iPartnerAddServices;
        private readonly IPartnerGetServices _iPartnerGetServices;
        private readonly IMapper _MAP;
        public NfeController()
        {
            // Exemplo de chamada para gerar uma NF-e

        }



        // public string NFeAutorizacao(string XmlEnvio, string VersaoSchema, short Ambiente, short CodIbgeUfEmi, string SiglaWS, string PathCertificado, string SenhaCertificado, ref string MsgErr, ref short FlagErr)
        // {
        //     try
        //     {
        //         // Converte dados do xml para XmlNode
        //         XmlDocument oXmlDoc = new XmlDocument();
        //         oXmlDoc.LoadXml(XmlEnvio);
        //         XmlNode oNode = oXmlDoc.DocumentElement;
        //         // Carrega o certificado
        //         X509Certificate certificado = new X509Certificate();
        //         certificado = SelecionarCertificado(PathCertificado, SenhaCertificado, ref MsgErr, ref FlagErr);

        //         // Se conseguiu localizar o certificado digital
        //         if (FlagErr == 0)
        //         {
        //             // Identifica  o WebService a ser utilizado: "SEFAZ Estadual", "Ambiente Nacional" ou "SCAN"
        //             switch (SiglaWS)
        //             {
        //                 case "SEFAZEST": // WebService da SEFAZ Estadual ou Virtual
        //                                  // Identifica o ambiente a ser utilizado
        //                     switch (Ambiente)
        //                     {
        //                         //Ambiente de Homologação
        //                         #region
        //                         case 2: // HOMOLOGAÇÃO
        //                                 // Identifica o código IBGE do Estado
        //                             switch (CodIbgeUfEmi)
        //                             {
        //                                 case 31: // MG
        //                                          // Declara as variáveis do WebService

        //                                     MG.NfeAutorizacao.Homologacao.NfeAutorizacao wsMG = new BibliotecaNFe.MG.NfeAutorizacao.Homologacao.NfeAutorizacao();
        //                                     MG.NfeAutorizacao.Homologacao.nfeCabecMsg nfeCabecMsgMG = new BibliotecaNFe.MG.NfeAutorizacao.Homologacao.nfeCabecMsg();
        //                                     MG.NfeAutorizacao.Homologacao.nfeDadosMsg nfeDadosMsgMG = new BibliotecaNFe.MG.NfeAutorizacao.Homologacao.nfeDadosMsg();

        //                                     // Coloca os valores no cabeçalho

        //                                     nfeCabecMsgMG.cUF = CodIbgeUfEmi.ToString().Trim();
        //                                     nfeCabecMsgMG.versaoDados = VersaoSchema;
        //                                     wsMG.nfeCabecMsgValue = nfeCabecMsgMG;
        //                                     nfeDadosMsgMG.Any = new XmlNode[] { oXmlDoc };
        //                                     nfeDadosMsgMG.Any[0] = oNode;

        //                                     // Coloca o certificado
        //                                     wsMG.ClientCertificates.Add(certificado);
        //                                     wsMG.Timeout = 120000;

        //                                     // Comunica com o WebService
        //                                     string obj = nfeDadosMsgMG.Any[0].OuterXml;
        //                                     Console.WriteLine(obj);

        //                                     string retorno = wsMG.NfeAutorizacaoLote(nfeDadosMsgMG).ToString();
        //                                     Console.WriteLine(retorno);


        //                                     return wsMG.NfeAutorizacaoLote(nfeDadosMsgMG).ToString();
        //                                 default: // Código não foi informado ou é inválido
        //                                     FlagErr = 1;
        //                                     MsgErr = "Erro: Código da UF informada " + CodIbgeUfEmi.ToString().Trim() + ". Código inválido ou SEFAZ não possui WebService próprio.";
        //                                     return "";
        //                             }  // switch (CodIbgeUfEmi)

        //                         default: // Ambiente incorreto (Diferente de 1 e 2)
        //                             FlagErr = 1;
        //                             MsgErr = "Erro: Ambiente informado: " + Ambiente.ToString().Trim() + ". Informe um código de ambiente válido.";
        //                             return "";
        //                     }  // switch (Ambiente)
        //                 #endregion

        //                 default: // WebService não informadou ou parâmetro incorreto
        //                     FlagErr = 1;
        //                     MsgErr = "Erro: Sigla do WebService a ser utilizado " + SiglaWS.Trim() + ". Informe um código válido.";
        //                     return "";
        //             }  // switch (SiglaWS)
        //         }
        //         else
        //         {
        //             return ""; // Retorno em branco pois houve erro
        //         }  // if (FlagErr == 0)
        //     }
        //     catch (Exception e)
        //     {
        //         FlagErr = 1;
        //         MsgErr = "Erro: Não foi possível enviar o lote de NF-e à SEFAZ. " + e.Message + " - " + e.StackTrace.ToString();//"Erro: Não foi possível enviar o lote de NF-e à SEFAZ. " + e.Message + "\n" + e.InnerException.ToString() + "\n" + e.StackTrace.ToString();
        //         return "";
        //     }
        // }

    }
}