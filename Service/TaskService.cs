using Chronos.Data;
using Chronos.Model;
namespace Chronos.Service
{
    public interface ITaskService
    {
        public Task<Task> GetTaskIdAsync(int id);
        public Task<IEnumerable<Task>> GetAllTaskAsync();
        //public Task<IEnumerable<Task>> GetAllTaskAsync(int projectId);
        public Task<Task> SaveTaskAsync(Task task);
        public Task<Task> UpdateTaskAsync(Task task);
        public Task<bool> DeleteTaskAsync(int id);
    }
    public class TaskService(IGenericRepository<Task> repository) : ITaskService
    {
        private readonly IGenericRepository<Task> _repository = repository;

        public async Task<Task> GetTaskIdAsync(int id) => await _repository.GetByIdAsync(id);
        
        public async Task<IEnumerable<Task>> GetAllTaskAsync() => await _repository.GetAllAsync();
        
        public async Task<Task> SaveTaskAsync(Task task) => await _repository.AddAsync(task);
        
        public async Task<Task> UpdateTaskAsync(Task task) => await _repository.UpdateAsync(task);
        
        public async Task<bool> DeleteTaskAsync(int id) => await _repository.DeleteAsync(id);
    }
}
