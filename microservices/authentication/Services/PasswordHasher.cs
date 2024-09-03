using BCrypt.Net;

namespace authentication.Services
{
    public class PasswordHasher
    {
        public string HashPassword(string password)
        {
            var bcrypt = BCrypt.Net.BCrypt.HashPassword(password);
            return bcrypt;
        }

        public bool VerifyPassword(string password, string hashedPassword)
        {
            return BCrypt.Net.BCrypt.Verify(password, hashedPassword);
        }
    }
}
