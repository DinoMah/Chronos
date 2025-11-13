using Chronos.Model;

namespace Chronos.DTOs
{
  public class ProjectDTO
  {
    public string ProjectName { get; set; } = string.Empty;
    public DateTime InitDate { get; set; }
    public DateTime EndDate { get; set; }
    public List<TaskDTO> Tasks { get; set; } = [];
  }
}
