using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace MyMvcReactApp.Controllers.API;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly UserManager<IdentityUser> _userManager;
    private readonly ILogger<UsersController> _logger;

    public UsersController(
        UserManager<IdentityUser> userManager,
        ILogger<UsersController> logger)
    {
        _userManager = userManager;
        _logger = logger;
    }

    [HttpGet]
    public async Task<IActionResult> GetUsers()
    {
        try
        {
            var users = _userManager.Users.ToList();
            
            var userList = users.Select(user => new
            {
                id = user.Id,
                name = user.UserName,
                email = user.Email,
                isVerified = user.EmailConfirmed,
                avatarUrl = $"/assets/images/avatar/avatar-{Math.Abs(user.Id.GetHashCode()) % 24 + 1}.webp",
            }).ToList();

            return Ok(userList);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error fetching users");
            return StatusCode(500, new { message = "An error occurred while fetching users" });
        }
    }
}

