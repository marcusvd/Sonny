/*
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.Dto;
using Services.Services.Contracts;


namespace Api.Controllers
{
    [ApiController]
    [Route("api/{controller}")]


    public class TechInfoController : ControllerBase
    {
        private RunInformation _run;
        public TechInfoController(RunInformation run)
        {
            _run = run;
        }

        [HttpGet]
        [AllowAnonymous]
        public IActionResult Get()
        {
            InfoNetworkDb net = new InfoNetworkDb();
            RunInformation executor = new RunInformation();
            //ADDRESS IP
            string _Ip = string.Empty;
            foreach (var ip in executor.GetIp())
            {
                _Ip = ip;

            }
            //ADAPTERNAME
            //  return Ok(executor.GetAdpName());

            net.AdapterName = executor.GetAdpName();
            net.Ip = executor.GetIp()[0];
            // = executor.GetDefaultGatway();
            net.MacAddress = executor.MacAddress();
            net.DhcpServer = executor.DhcpServer();

            //net.teste = new List<string>();
            foreach (string gateway in executor.GetDefaultGatway())
            {
                if (gateway == net.Ip)
                {

                }
                else
                {
                    net.DefaultGateway = gateway;
                }

            }

            //dns
            List<string> dnsArray = new List<string>();
            foreach (string dns in executor.Dns())
            {
                if (dns == (net.Ip) || dns == (net.DefaultGateway))
                {
                    //string trash = dns;
                }
                else
                {
                    if (net.DnsPri != null)
                    {
                        net.DnsSec = dns;
                    }
                    else
                    {
                        net.DnsPri = dns;
                    }

                }
            }


            return Ok(net);
        }
    }
}
*/