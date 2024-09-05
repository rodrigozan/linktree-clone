namespace authentication.Models
{
    public class User
    {
        public User() { }
        public User(int id, string name, string username, string email, string password, DateTime createdat, DateTime updatedat)
        {
            id = id;
            username = username;
            email = email;
            password = password;
            createdat = createdat;
            updatedat = updatedat;
        }

        public int id { get; set; }
        public string? username { get; set; }
        public string? email { get; set; }
        public string? password { get; set; }
        public DateTime? createdat { get; set; }
        public DateTime? updatedat { get; set; }
    }
}
