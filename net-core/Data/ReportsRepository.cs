using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using NetCore.Models;

namespace NetCore.Data
{
    public class ReportsRepository : BaseRepository<MonthlyBudget>
    {
        public ReportsRepository(IOptions<Settings> settings) : base(settings, "reports") {          
        }

        public async Task<MonthlyBudget> GetMonthlyBudget(int year, int month)
        {
            var builder = Builders<MonthlyBudget>.Filter;
            var filter = builder.Eq("Year", year) & builder.Eq("Month", month);
            return await Collection
                .Find<MonthlyBudget>(filter)
                .FirstOrDefaultAsync();
        }
    }
}