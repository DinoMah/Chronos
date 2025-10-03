using Chronos.Data;
using Chronos.Model;

namespace Chronos.Service
{
    public interface  IUserService
    {
        public Task<User> GetUserByIdAsync(int id);
        public Task<IEnumerable<User>> GetAllUsersAsync();
        public Task<User> SaveUserAsync(User user);
        public Task<User> UpdateUserAsync(User user);
        public Task<bool> DeleteUserAsync(int id);
    }

    public class UserService(IGenericRepository<User> repository) : IUserService
    {
        private readonly IGenericRepository<User> _repository = repository;

        public async Task<User> GetUserByIdAsync(int id) => await _repository.GetByIdAsync(id);

        public async Task<IEnumerable<User>> GetAllUsersAsync() => await _repository.GetAllAsync();

        public async Task<User> SaveUserAsync(User user) => await _repository.AddAsync(user);

        public async Task<User> UpdateUserAsync(User user) => await _repository.UpdateAsync(user);

        public async Task<bool> DeleteUserAsync(int id) => await _repository.DeleteAsync(id);
    }
}
