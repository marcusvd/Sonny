using System.Collections.Generic;


namespace Domain.Entities.Shared
{
    public class Contact
    {
        public Contact()
        { }
        public Contact(string email, string site, string cel, string zap, string landline, List<SocialNetwork> socialMedias)
        {
            Email = email;
            Site = site;
            Cel = cel;
            Zap = zap;
            Landline = landline;
            SocialMedias = socialMedias;
        }
        public Contact(string email, string site, string cel, string zap, string landline, SocialNetwork sMedias= null)
        {
            Email = email;
            Site = site;
            Cel = cel;
            Zap = zap;
            Landline = landline;
            // SocialMedias.Add(sMedias);
        }

        public int Id { get; set; }
        public string Email { get; set; }
        public string Site { get; set; }
        public string Cel { get; set; }
        public string Zap { get; set; }
        public string Landline { get; set; }
        public bool Deleted { get; set; }
        public List<SocialNetwork> SocialMedias { get; set; } = new List<SocialNetwork>();

    }
}