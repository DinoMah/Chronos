using Chronos.Model;
using Chronos.Service;
using Microsoft.AspNetCore.Mvc;

namespace Chronos.Controller
{
    [ApiController]
    [Route("[controller]")]
    public class RoleController : ControllerBase
    {
        public readonly IRoleService _roleService;
        public RoleController(IRoleService roleService)
        {
            _roleService = roleService;
        }

        [HttpGet]
        public IActionResult Index()
        {
            return new JsonResult(new UserRole());
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetAllRoles()
        {
            try
            {
                var roles = await _roleService.GetAllRolesAsync();
                return Ok(roles);
            }
            catch (Exception ex)
            {
                return BadRequest($"Could not get roles: {ex}");
            }

        }
    }
}