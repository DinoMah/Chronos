using Chronos.Model;
using Microsoft.AspNetCore.Mvc;

namespace Chronos.Controller
{
    [ApiController]
    [Route("[controller]")]
    public class ProjectController : ControllerBase
    {
        [HttpGet("all")]
        public IActionResult GetAllProjects()
        {
            return new JsonResult(new List<Project>());
        }

        [HttpGet("{id:int}")]
        public IActionResult GetProjectById()
        {
            return new JsonResult(new Project());
        }

        [HttpPost("save")]
        public IActionResult SaveProject([FromBody] Project project)
        {
            return new JsonResult(project);
        }

        [HttpPost("update")]
        public IActionResult UpdateProject([FromBody] Project project)
        {
            return new JsonResult(project);
        }
    }
}