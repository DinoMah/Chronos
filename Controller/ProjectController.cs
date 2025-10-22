using Chronos.Model;
using Chronos.Service;
using Microsoft.AspNetCore.Mvc;

namespace Chronos.Controller
{
    [ApiController]
    [Route("[controller]")]
    public class ProjectController : ControllerBase
    {
        public readonly IProjectService _projectService;
        public ProjectController(IProjectService projectService)
        {
            _projectService = projectService;
        }


        [HttpGet("all")]
        public async Task<IActionResult> GetAllProjects()
        {
            try
            {
                var projects = await _projectService.GetAllProjectAsync();
                return Ok(projects);
            }
            catch (Exception ex)
            {
                return BadRequest($"Could not get projects: {ex}");
            }
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetProjectById(int id)
        {
            try
            {
                var project = await _projectService.GetProjectIdAsync(id);
                return Ok(project);
            }
            catch (Exception ex)
            {
                return BadRequest($"Could not get project: {ex}");
            }
        }

        [HttpPost("save")]
        public async Task<IActionResult> SaveProject([FromBody] Project project)
        {
            try
            {
                var SaveProject = await _projectService.SaveProjectAsync(project);
                return Ok(SaveProject);
            }
            catch (Exception ex)
            {
                return BadRequest($"Could not save project: {ex}");
            }
        }

        [HttpPost("update")]
        public async Task<IActionResult> UpdateProject([FromBody] Project project)
        {
            try
            {
                var UpdateProject = await _projectService.UpdateProjectAsync(project);
                return Ok(UpdateProject);
            }
            catch (Exception ex)
            {
                return BadRequest($"Could not update project: {ex}");
            }
        }
    }
}