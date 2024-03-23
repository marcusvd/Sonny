using System.Collections.Generic;

namespace Application.Services.Shared.Dtos.Contact
{
    public class ContactDto
    {

        public ContactDto()
        {

        }
        public ContactDto(string email, string site, string cel, string zap, string landline, SocialNetworkDto sMedias = null)
        {
            Email = email;
            Site = site;
            Cel = cel;
            Zap = zap;
            Landline = landline;
            // SocialMedias.Add(sMedias);
        }
        public ContactDto(string email, string site, string cel, string zap, string landline, List<SocialNetworkDto> sMedias = null)
        {
            Email = email;
            Site = site;
            Cel = cel;
            Zap = zap;
            Landline = landline;
            SocialMedias = sMedias;
        }

        public int Id { get; set; }
        public string Email { get; set; }
        public string Site { get; set; }
        public string Cel { get; set; }
        public string Zap { get; set; }
        public string Landline { get; set; }
        public List<SocialNetworkDto> SocialMedias { get; set; }

    }
}