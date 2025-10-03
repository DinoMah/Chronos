using Chronos.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Chronos.Controller
{
    [ApiController]
    [Route("[controller]")]
    public class TaskController : ControllerBase
    {
        [HttpGet]
        public ActionResult Index()
        {
            return new JsonResult(new { });
        }

        [HttpGet("{id:int}")]
        public IActionResult GetProjectTask(int id)
        {
            return new JsonResult(new Model.WorkItem());
        }

        [HttpGet("all")]
        public IActionResult GetProjectTasks()
        {
            return new JsonResult(new List<Model.WorkItem>());
        }

        [HttpPost("new")]
        [ValidateAntiForgeryToken]
        public IActionResult CreateTask([FromBody] Model.WorkItem newTask)
        {
            return new JsonResult(newTask);
        }

        [HttpPost("update")]
        [ValidateAntiForgeryToken]
        public IActionResult UpdateTask([FromBody] Model.WorkItem updatedTask)
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
    }
}
