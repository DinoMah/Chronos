namespace Chronos.Model
{
    public class Note
    {
        public int Id { get; set; }
        public Area Area { get; set; } = new Area();
        public string Content { get; set; } = string.Empty;
    }
}
