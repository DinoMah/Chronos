using Chronos.Data;
using Chronos.DTOs;
using Chronos.Model;
namespace Chronos.Service
{
  public interface ITaskService
  {
    public Task<WorkItem> GetTaskIdAsync(int id);
    public Task<IEnumerable<WorkItem>> GetAllTaskAsync();
    public Task<IEnumerable<WorkItem>> GetProjectTasksAsync(int projectId);
    public Task<WorkItem> SaveTaskAsync(WorkItem task);
    public Task<WorkItem> UpdateTaskAsync(WorkItem task);
    public Task<bool> DeleteTaskAsync(int id);
    public Task<Note?> SaveNoteAsync(Note addNote);
    Task SaveNoteAsync(NoteDTO newNote);
    }
  public class TaskService(ITaskRepository repository) : ITaskService
  {
    private readonly ITaskRepository _repository = repository;
    public async Task<WorkItem> GetTaskIdAsync(int id) => await _repository.GetByIdAsync(id);
    public async Task<IEnumerable<WorkItem>> GetAllTaskAsync() => await _repository.GetAllAsync();
    public async Task<IEnumerable<WorkItem>> GetProjectTasksAsync(int projectId) => await _repository.GetProjectTasks(projectId);
    public async Task<WorkItem> SaveTaskAsync(WorkItem task) => await _repository.AddAsync(task);
        
    public async Task<WorkItem> UpdateTaskAsync(WorkItem task) => await _repository.UpdateAsync(task);
        
    public async Task<bool> DeleteTaskAsync(int id) => await _repository.DeleteAsync(id);
    public async Task<Note?> SaveNoteAsync(Note addNote)
    {
        return await _repository.SaveNote(addNote);
    }

    public Task SaveNoteAsync(NoteDTO newNote)
    {
        var note = new Note
        {
            TaskId = newNote.TaskNumber,
            Content = newNote.Note
        };
        return SaveNoteAsync(note);
    }
    }
}
