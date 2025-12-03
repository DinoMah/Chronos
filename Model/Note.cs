namespace Chronos.Model
{
    public class Note
    {
        public int Id { get; set; }
        public int TaskId { get; set; } 
        public string Content { get; set; } = string.Empty; 
    }
}
