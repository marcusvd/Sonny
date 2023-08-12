using System.Collections.Generic;

namespace Application.Services.Shared.Dtos.Contact
{
    public class ContactDto
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Site { get; set; }
        public string Cel { get; set; }
        public string Zap { get; set; }
        public string Landline { get; set; }
        public List<SocialNetworkDto> socialnetworks { get; set; }

    }
}