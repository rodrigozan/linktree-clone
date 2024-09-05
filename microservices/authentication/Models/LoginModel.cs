using System.Xml.Linq;

namespace authentication.Models
{
    public class LoginModel
    {
        public LoginModel() { }
        public LoginModel(string? username, string? email, string password)
        {
            username = username;
            email = email;
            password = password;
        }
        
        public string? username { get; set; }
        public string? email { get; set; }
        public string password { get; set; }
    }
}
