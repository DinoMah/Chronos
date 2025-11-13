using Chronos.Data;
using Chronos.Model;

namespace Chronos.Service
{
    public interface IRoleService
    {
        public Task<IEnumerable<UserRole>> GetAllRolesAsync();
       
    }
    public class RoleService(IGenericRepository<UserRole> repository) : IRoleService
    {
        private readonly IGenericRepository<UserRole> _repository = repository;
        public async Task<IEnumerable<UserRole>> GetAllRolesAsync() => await _repository.GetAllAsync();
    }
}
