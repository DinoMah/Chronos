namespace Chronos.Model
{
    public class Project
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public int Period { get; set; }
        public bool Active { get; set; }
    }
}
