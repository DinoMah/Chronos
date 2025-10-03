using Chronos.Model;
using Chronos.Service;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace Chronos.Controller
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public IActionResult Index()
        {
            return new JsonResult(new { });
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetAllUsers()
        {
            try
            {
                var users = await _userService.GetAllUsersAsync();
                return Ok(users);
            }
            catch (Exception ex)
            {
                return BadRequest($"Could not get users: {ex}");
            }
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetUserById(int id)
        {
            try
            {
                var user = await _userService.GetUserByIdAsync(id);
                return Ok(user);
            }
            catch (Exception ex)
            {
                return BadRequest($"Could not get user: {ex}");
            }
        }

        [HttpPost("save")]
        public IActionResult SaveUser([FromBody] User user)
        {
            return new JsonResult(user);
        }

        [HttpPost("update")]
        public IActionResult UpdateUser([FromBody] User user)
        {
            return new JsonResult(user);
        }
    }
}
