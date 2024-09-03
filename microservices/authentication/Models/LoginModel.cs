using System.Xml.Linq;

namespace authentication.Models
{
    public class LoginModel
    {
        public LoginModel(string name, string username, string email, string password)
        {
            Username = username;
            Email = email;
            Password = password;
        }
        
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
