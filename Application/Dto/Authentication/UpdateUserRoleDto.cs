namespace Application.Dto.Authentication
{
     public class UpdateUserRoleDto
    {
        public string UserName { get; set; }
        public string Role { get; set; }
        public bool Delete { get; set; }
    }
}