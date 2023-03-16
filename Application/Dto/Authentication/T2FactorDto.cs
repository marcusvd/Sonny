using System.ComponentModel.DataAnnotations;

namespace Application.Dto.Authentication
{
    public class T2FactorDto
    {
        // [Required]
        public string UserName { get; set; }
        [Required]
        public string Token { get; set; }
    }
}