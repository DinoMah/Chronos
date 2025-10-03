namespace Chronos.Model
{
    public class WorkItem
    {
        public int Id { get; set; }
        public int TaskNumber { get; set; }
        public Area Area { get; set; } = new Area();
        public string Description { get; set; } = string.Empty;
        public User Responsible { get; set; } = new User();
        public Period ProgrammedPeriod { get; set; } = new Period();
        public Period RealPeriod { get; set; } = new Period();
    }
}
