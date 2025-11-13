namespace Chronos.Model
{
  public class WorkItem
  {
    public int Id { get; set; }
    public int TaskNumber { get; set; }
    public int Area { get; set; }
    public string Description { get; set; } = string.Empty;
    public int Responsible { get; set; }
    public int Project { get; set; }
    public int ProgrammedPeriod { get; set; }
    public int RealPeriod { get; set; }
    public bool Active { get; set; }
  }
}
