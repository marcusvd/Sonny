using System.Collections.Generic;


namespace Domain.Entities
{
    public class Contact
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Site { get; set; }
        public string Cel { get; set; }
        public string Zap { get; set; }
        public string Landline { get; set; }
        public List<SocialNetwork> socialnetworks { get; set; }

    }


}