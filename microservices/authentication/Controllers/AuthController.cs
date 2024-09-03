using authentication.Data;
using authentication.Models;
using authentication.Services;

using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace authentication.Controllers
{
    [Route("[controller]")]
    public class AuthenticationController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly PasswordHasher _passwordHasher;
        private readonly TokenService _tokenService;

        public AuthenticationController(ApplicationDbContext context, PasswordHasher passwordHasher, TokenService tokenService)
        {
            _context = context;
            _passwordHasher = passwordHasher;
            _tokenService = tokenService;
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] LoginModel loginModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.Values.SelectMany(v => v.Errors));
            }

           var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == loginModel.Username || u.Email == loginModel.Email);
            if (user == null || !_passwordHasher.VerifyPassword(loginModel.Password, user.Password))
            {
                return Unauthorized("Invalid username or password");
            }

            var token = _tokenService.GenerateToken(user);
            return Ok(new { token = token });

        }

        [HttpPost("CreateUser")]
        public async Task<IActionResult> CreateUser([FromBody] User createUserModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.Values.SelectMany(v => v.Errors));
            }

            var user = new User
            {
                Id = createUserModel.Id, 
                Email = createUserModel.Email,
                Username = createUserModel.Username, 
                Password = _passwordHasher.HashPassword(createUserModel.Password)
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(new { message = "User created successfully" });
        }

        [HttpPut("UpdateUser")]
        public async Task<IActionResult> UpdateUser([FromBody] User updateUserModel)
        {
            var user = await _context.Users.FindAsync(updateUserModel.Id);
            if (user == null)
            {
                return NotFound("User not found");
            }

            user.Email = updateUserModel.Email;

            if (!string.IsNullOrEmpty(updateUserModel.Password))
            {
                user.Password = _passwordHasher.HashPassword(updateUserModel.Password);
            }

            _context.Users.Update(user);
            await _context.SaveChangesAsync();

            return Ok(new { message = "User updated successfully" });
        }


        [HttpPost("Logout")]
        public IActionResult Logout()
        {
            return Ok(new { message = "Logout succefull" });
        }
    }
}
