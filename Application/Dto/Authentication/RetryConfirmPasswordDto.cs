using System.ComponentModel.DataAnnotations;

namespace Application.Dto.Authentication
{
    public class RetryConfirmPasswordDto
    {
        // [Required]
        // public string UserName { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
}