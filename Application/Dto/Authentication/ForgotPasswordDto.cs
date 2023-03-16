using System.ComponentModel.DataAnnotations;

namespace Application.Dto.Authentication
{
    public class ForgotPasswordDto
    {
        // [Required]
        // public string UserName { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
}