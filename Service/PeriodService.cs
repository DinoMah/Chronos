using Chronos.Data;
using Chronos.Model;

namespace Chronos.Service
{
  public interface IPeriodService
  {
    public Task<Period> GetPeriodByIdAsync(int periodId);
    public Task<Period> SavePeriodAsync(Period newPeriod);
    public Task<Period> UpdatePeriodAsync(Period newPeriod);
    public Task<bool> DeletePeriodAsync(int periodId);
  }

  public class PeriodService(IGenericRepository<Period> repository) : IPeriodService
  {
    private readonly IGenericRepository<Period> _repository = repository;

    public async Task<Period> GetPeriodByIdAsync(int periodId) => await _repository.GetByIdAsync(periodId);
    public async Task<Period> SavePeriodAsync(Period newPeriod) => await _repository.AddAsync(newPeriod);
    public async Task<Period> UpdatePeriodAsync(Period newPeriod) => await _repository.UpdateAsync(newPeriod);
    public async Task<bool> DeletePeriodAsync(int periodId) => await _repository.DeleteAsync(periodId);
  }
}
