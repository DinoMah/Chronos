using Chronos.Data;
using Chronos.Model;

namespace Chronos.Service
{
    public interface IProjectService
    {
        public Task<Project> GetProjectIdAsync(int id);
        public Task<IEnumerable<Project>> GetAllProjectAsync();
        public Task<Project> SaveProjectAsync(Project project);
        public Task<Project> UpdateProjectAsync(Project project);
        public Task<bool> DeleteProjectAsync(int id);
    }
    public class ProjectService(IGenericRepository<Project> repository) : IProjectService
    {
        
        private readonly IGenericRepository<Project> _repository = repository;
        
        public async Task<Project> GetProjectIdAsync(int id) => await _repository.GetByIdAsync(id);
        
        public async Task<IEnumerable<Project>> GetAllProjectAsync() => await _repository.GetAllAsync();
        
        public async Task<Project> SaveProjectAsync(Project project) => await _repository.AddAsync(project);
        
        public async Task<Project> UpdateProjectAsync(Project project) => await _repository.UpdateAsync(project);
        
        public async Task<bool> DeleteProjectAsync(int id) => await _repository.DeleteAsync(id);
    }
}
