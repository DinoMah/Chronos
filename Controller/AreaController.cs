using Chronos.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Chronos.Controller
{
    [ApiController]
    [Route("[controller]")]
    public class AreaController : ControllerBase
    {

        public AreaController()
        {

        }

        [HttpGet]
        public IActionResult Index()
        {
            return new JsonResult(new Area());
        }

        [HttpGet("all")]
        public IActionResult GetAllAreas()
        {
            return Ok();
        }

        [HttpGet("{id:int}")]
        // GET: area/5
        public IActionResult Details(int id)
        {
            return Ok();
        }

        // POST: area/new
        [HttpPost("new")]
        [ValidateAntiForgeryToken]
        public IActionResult Create([FromBody] Area area)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return Ok();
            }
        }

        // POST: area/edit
        [HttpPost("edit")]
        [ValidateAntiForgeryToken]
        public IActionResult Edit([FromBody] Area area)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return Ok();
            }
        }

        // POST: area/delete/5
        [HttpPost("delete/{id:int}")]
        [ValidateAntiForgeryToken]
        public IActionResult Delete(int id)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return Ok();
            }
        }
    }
}
