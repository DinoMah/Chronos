using Chronos.DTOs;
using Chronos.Model;
using Chronos.Service;
using Microsoft.AspNetCore.Mvc;

namespace Chronos.Controller
{
    [ApiController]
    [Route("[controller]")]
    public class TaskController : ControllerBase
    {
        private readonly ITaskService _taskService;

        public TaskController(ITaskService taskService)
        {
            _taskService = taskService;
        }

        [HttpGet]
        public ActionResult Index()
        {
            return new JsonResult(new { });
        }

        [HttpGet("{id:int}")]
        public IActionResult GetProjectTask(int id)
        {
            return new JsonResult(new WorkItem());
        }

        [HttpGet("all")]
        public IActionResult GetProjectTasks()
        {
            return new JsonResult(new List<WorkItem>());
        }

        [HttpPost("new")]
        [ValidateAntiForgeryToken]
        public IActionResult CreateTask([FromBody] List<WorkItem> newTask)
        {
            return new JsonResult(newTask);
        }

        [HttpPost("update")]
        [ValidateAntiForgeryToken]
        public IActionResult UpdateTask([FromBody] WorkItem updatedTask)
        {
            return new JsonResult(updatedTask);
        }

        // GET: TaskController/Delete/5
        [HttpPost("delete")]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id)
        {
            return new JsonResult(new { });
        }

        [HttpPost("addNote")]
        public async Task<IActionResult> AddNoteAsync([FromBody] NoteDTO newNote)
        {
            await _taskService.SaveNoteAsync(newNote); 
            return Ok(new { message = "Note saved successfully." }); 
        }
    }
}
