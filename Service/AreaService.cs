using Chronos.Data;
using Chronos.Model;

namespace Chronos.Service
{
    public interface IAreaService
    {
        public Task<Area> GetAreaByIdAsync(int id);
        public Task<IEnumerable<Area>> GetAllAreasAsync();
        public Task<Area> SaveAreaAsync(Area area);
        public Task<Area> UpdateAreaAsync(Area area);
        public Task<bool> DeleteAreaAsync(int id);
    }

    public class AreaService(IGenericRepository<Area> repository) : IAreaService
    {
        private readonly IGenericRepository<Area> _repository = repository;
        public async Task<Area> GetAreaByIdAsync(int id) => await _repository.GetByIdAsync(id);
        public async Task<IEnumerable<Area>> GetAllAreasAsync() => await _repository.GetAllAsync();
        public async Task<Area> SaveAreaAsync(Area area) => await _repository.AddAsync(area);
        public async Task<Area> UpdateAreaAsync(Area area) => await _repository.UpdateAsync(area);
        public async Task<bool> DeleteAreaAsync(int id) => await _repository.DeleteAsync(id);
    }
}
