namespace authentication.Models
{
    public class User
    {
        public User() { }
        public User(int id, string name, string username, string email, string password)
        {
            Id = id;
            Username = username;
            Email = email;
            Password = password;
        }

        public int Id { get; set; }
        public string? Username { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
