using Microsoft.AspNetCore.Identity;

namespace Chronos.Model
{
    public class User
    {
        public int Id { get; set; }
        public string UserName { get; set; } = string.Empty;
        public string FullName { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public int Role { get; set; }
        public string Email { get; set; } = string.Empty;
        public int Area { get; set; }
        public bool Active { get; set; }
    }
}
