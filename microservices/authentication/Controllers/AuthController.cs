using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BCrypt.Net;

using authentication.Data;
using authentication.Models;
using authentication.Services;
namespace authentication.Controllers
{
    [Route("[controller]")]
    public class AuthenticationController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly TokenService _tokenService;

        public AuthenticationController(ApplicationDbContext context, TokenService tokenService)
        {
            _context = context;
            _tokenService = tokenService;
        }

        private bool VerifyPasswordHash(string password, string storedHash)
        {
            return BCrypt.Net.BCrypt.Verify(password, storedHash);
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] LoginModel loginModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.Values.SelectMany(v => v.Errors));
            }

           var user = await _context.Users.FirstOrDefaultAsync(u => u.username == loginModel.username || u.email == loginModel.email);
            if (user == null)
            {
                return Unauthorized("User not found");
            }

            if (!VerifyPasswordHash(loginModel.password, user.password))
            {
                return Unauthorized("Invalid Password");
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
                id = createUserModel.id, 
                email = createUserModel.email,
                username = createUserModel.username, 
                password = createUserModel.password
            };

            _context.Users.Add(user);
            int rowsAffected = await _context.SaveChangesAsync();

            if (rowsAffected != 1)
            {
                // Handle potential error during saving
                return StatusCode(500, "An error occurred while creating the user.");
            }

            // Retrieve the newly created user from the database
            User createdUser = _context.Users.FirstOrDefault(u => u.email == user.email);

            return Ok(new { message = "User created successfully", user = createdUser });
        }

        [HttpPut("UpdateUser")]
        public async Task<IActionResult> UpdateUser([FromBody] User updateUserModel)
        {
            var user = await _context.Users.FindAsync(updateUserModel.id);
            if (user == null)
            {
                return NotFound("User not found");
            }

            user.email = updateUserModel.email;

            if (!string.IsNullOrEmpty(updateUserModel.password))
            {
                user.password = updateUserModel.password;
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
