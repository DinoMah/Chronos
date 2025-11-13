using Chronos.DTOs;
using Chronos.Model;
using Chronos.Service;
using Microsoft.AspNetCore.Mvc;

namespace Chronos.Controller
{
  [ApiController]
  [Route("[controller]")]
  public class ProjectController(
    IProjectService projectService,
    IPeriodService periodService,
    ITaskService taskService
  ) : ControllerBase
  {
    public readonly IProjectService _projectService = projectService;
    public readonly IPeriodService _periodService = periodService;
    public readonly ITaskService _taskService = taskService;

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
        var period = await _periodService.GetPeriodByIdAsync(project.Period);
        var tasks = await _taskService.GetProjectTasksAsync(project.Id);
        var taskPeriods = new List<Period>();

        foreach (var task in tasks)
        {
          var taskPeriod = await _periodService.GetPeriodByIdAsync(task.ProgrammedPeriod);
          taskPeriods.Add(taskPeriod);
        }

        return Ok(new
        {
          Project = project,
          Period = period,
          Tasks = tasks,
          TaskPeriods = taskPeriods
        });
      }
      catch (Exception ex)
      {
        return BadRequest($"Could not get project: {ex}");
      }
    }

    [HttpPost("save")]
    public async Task<IActionResult> SaveProject([FromBody] ProjectDTO project)
    {
      try
      {
        var projectPeriod = new Period { InitDate = project.InitDate, EndDate = project.EndDate };
        var savedPeriod = await _periodService.SavePeriodAsync(projectPeriod);
        var newProject = new Project
        {
          Name = project.ProjectName,
          Period = savedPeriod.Id,
          Active = true
        };
        var savedProject = await _projectService.SaveProjectAsync(newProject);
        var taskList = new List<WorkItem>();

        foreach (var task in project.Tasks)
        {
          var taskPeriod = new Period { InitDate = task.InitDate, EndDate = task.EndDate };
          var savedTaskPeriod = await _periodService.SavePeriodAsync(taskPeriod);
          var newTask = new WorkItem
          {
            TaskNumber = task.TaskNumber,
            Area = int.Parse(task.AreaId),
            Project = savedProject.Id,
            Description = task.Activity,
            Responsible = int.Parse(task.UserId),
            ProgrammedPeriod = savedTaskPeriod.Id,
            Active = true
          };
          var savedTask = await _taskService.SaveTaskAsync(newTask);
          taskList.Add(savedTask);
        }

        var savedData = new
        {
          Project = savedProject,
          Tasks = taskList
        };

        return Ok(savedData);
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