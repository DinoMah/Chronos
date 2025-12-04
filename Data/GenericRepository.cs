using Chronos.DTOs;
using Dapper;
using Microsoft.Data.SqlClient;
using Serilog;
using System.Data;

namespace Chronos.Data
{
    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {
        private readonly string _connectionString;
        private readonly string _tableName;

        public GenericRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection") ?? "";
            _tableName = typeof(T).Name;
        }

        protected IDbConnection CreateConnection() => new SqlConnection(_connectionString);

        public async Task<T> GetByIdAsync(int id)
        {
            try
            {
                using var connection = CreateConnection();
                var query = $"SELECT * FROM [{_tableName}] WHERE Id = @Id";
                var result = await connection.QuerySingleOrDefaultAsync<T>(query, new { Id = id });
                return result != null ? result : Task.FromException<T>(new KeyNotFoundException($"Entity with Id {id} not found")).Result;
            }
            catch (Exception ex)
            {
                Log.Error($"Error in {nameof(GetByIdAsync)}: {ex.Message}");
                return Task.FromException<T>(ex).Result;
            }
        }

        public async Task<IEnumerable<T>> GetAllAsync()
        {
            try
            {
                using var connection = CreateConnection();
                var query = $"SELECT * FROM [{_tableName}]";
                var result = await connection.QueryAsync<T>(query);
                return result != null ? result : Enumerable.Empty<T>();
            }
            catch (Exception ex)
            {
                Log.Error($"Error in {nameof(GetAllAsync)}: {ex.Message}");
                return Enumerable.Empty<T>();
            }
        }

        public async Task<T> AddAsync(T entity)
        {
            try
            {
                using var connection = CreateConnection();
                var properties = typeof(T).GetProperties().Where(p => p.Name != "Id").ToList();
                var columns = string.Join(", ", properties.Select(p => $"[{p.Name}]"));
                var values = string.Join(", ", properties.Select(p => "@" + p.Name));
                var query = $"INSERT INTO [{_tableName}] ({columns}) VALUES ({values}); SELECT CAST(SCOPE_IDENTITY() as int)";
                var id = await connection.QuerySingleAsync<int>(query, entity);
                var idProperty = typeof(T).GetProperty("Id");
                if (idProperty != null)
                {
                    idProperty.SetValue(entity, id);
                }
                return entity;
            }
            catch (Exception ex)
            {
                Log.Error($"Error in {nameof(AddAsync)}: {ex.Message}");
                return Task.FromException<T>(ex).Result;
            }
        }

        public async Task<T> UpdateAsync(T entity)
        {
            try
            {
                using var connection = CreateConnection();
                var properties = typeof(T).GetProperties().Where(p => p.Name != "Id").ToList();
                var setClause = string.Join(", ", properties.Select(p => $"[{p.Name}] = @{p.Name}"));
                var idProperty = typeof(T).GetProperty("Id");
                if (idProperty == null)
                {
                    throw new InvalidOperationException("Entity must have an Id property");
                }
                var idValue = idProperty.GetValue(entity);
                var query = $"UPDATE [{_tableName}] SET {setClause} WHERE Id = @Id";
                var affectedRows = await connection.ExecuteAsync(query, entity);
                if (affectedRows == 0)
                {
                    throw new KeyNotFoundException($"Entity with Id {idValue} not found");
                }
                return entity;
            }
            catch (Exception ex)
            {
                Log.Error($"Error in {nameof(UpdateAsync)}: {ex.Message}");
                return Task.FromException<T>(ex).Result;
            }
        }

        public async Task<bool> DeleteAsync(int id)
        {
            try
            {
                using var connection = CreateConnection();
                var query = $"DELETE FROM [{_tableName}] WHERE Id = @Id";
                var affectedRows = await connection.ExecuteAsync(query, new { Id = id });
                return affectedRows > 0;
            }
            catch (Exception ex)
            {
                Log.Error($"Error in {nameof(DeleteAsync)}: {ex.Message}");
                return false;
            }
        }

        public Task<NoteDTO?> SaveNote(NoteDTO addNote)
        {
            throw new NotImplementedException();
        }
    }
}
