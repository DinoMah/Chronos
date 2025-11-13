using Chronos.Model;
using Dapper;
using Serilog;

namespace Chronos.Data
{
  public interface ITaskRepository : IGenericRepository<WorkItem>
  {
    Task<IEnumerable<WorkItem>> GetProjectTasks(int projectId);
  }

  public class TaskRepository(IConfiguration configuration) : GenericRepository<WorkItem>(configuration), ITaskRepository
  {
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
