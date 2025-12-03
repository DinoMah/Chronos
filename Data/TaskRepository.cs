using Chronos.Model;
using Dapper;
using Serilog;

namespace Chronos.Data
{
  public interface ITaskRepository : IGenericRepository<WorkItem>
  {
    Task<IEnumerable<WorkItem>> GetProjectTasks(int projectId);
    Task<Note?> SaveNote(Note addNote);
  }

  public class TaskRepository(IConfiguration configuration) : GenericRepository<WorkItem>(configuration), ITaskRepository
  {
    public async Task<Note?> SaveNote(Note addNote)
    {
      try
      {
        using var connection = CreateConnection();
        var query = @"INSERT INTO dbo.Note (Task, Content) 
                      VALUES (@TaskId, @Content);
                      SELECT CAST(SCOPE_IDENTITY() as int);";
        var parameters = new { addNote.TaskId, addNote.Content };
        var noteId = await connection.QuerySingleOrDefaultAsync<int>(query, parameters);

        if (noteId == 0)
        {
            return null;
        }

        return new Note
        {
            Id = noteId,
            TaskId = addNote.TaskId,
            Content = addNote.Content
        };
      }
      catch (Exception ex)
      {
        Log.Error($"Error in {nameof(SaveNote)}: {ex.Message}");
        return null;
      }
    }
    public async Task<IEnumerable<WorkItem>> GetProjectTasks(int projectId)
    {
      try
      {
        using var connection = CreateConnection();
        var query = $"SELECT * FROM dbo.WorkItem WHERE Project = @ProjectId";
        var items = await connection.QueryAsync<WorkItem>(query, new { ProjectId = projectId });
        return items ?? [];
      }
      catch (Exception ex)
      {
        Log.Error($"Error in {nameof(GetProjectTasks)}: {ex.Message}");
        return [];
      }
    }
  }
}
