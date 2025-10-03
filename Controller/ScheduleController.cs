using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Chronos.Controller
{
    [ApiController]
    [Route("[controller]")]
    public class ScheduleController : ControllerBase
    {
        // GET: ScheduleController/Details/5
        [HttpGet]
        public IActionResult Details(int id)
        {
            return new JsonResult(new { });
        }

        // POST: ScheduleController/Create
        [HttpPost("new")]
        [ValidateAntiForgeryToken]
        public ActionResult Create([FromBody] List<Task> tasks)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return new JsonResult(new { });
            }
        }

        // POST: ScheduleController/Edit/5
        [HttpPost("edit")]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([FromBody] List<Task> tasks)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return new JsonResult(new { });
            }
        }

        // POST: ScheduleController/Delete/5
        [HttpPost("delete")]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return new JsonResult(new { });
            }
        }
    }
}
