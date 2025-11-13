namespace Chronos.DTOs
{
  public class TaskDTO
  {
    public int TaskNumber { get; set; }
    public string AreaId { get; set; } = string.Empty;
    public string Area { get; set; } = string.Empty;
    public string UserId { get; set; } = string.Empty;
    public string User { get; set; } = string.Empty;
    public string Activity { get; set; } = string.Empty;
    public DateTime InitDate { get; set; }
    public DateTime EndDate { get; set; }
  }
}
