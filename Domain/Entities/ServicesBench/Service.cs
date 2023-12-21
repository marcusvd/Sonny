using System;
using System.Collections.Generic;
using Domain.Entities;
using Domain.Entities.Authentication;

namespace Domain.Entities.ServicesBench
{
    public class Service
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public MyUser User { get; set; }
        public string Comments { get; set; }
        public DateTime IsAuthorized { get; set; }
        public DateTime Finished { get; set; }
        public List<Repair> Repairs { get; set; }
    }
}
