using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using NetCore.Models;

namespace NetCore.Data
{
    public class TransactionRepository : BaseRepository<Transaction>
    {
        public TransactionRepository(IOptions<Settings> settings) : base(settings, "transactions") {
            
        }

        public async Task<IEnumerable<Transaction>> GetForMonth(int year, int month)
        {
            var builder = Builders<Transaction>.Filter;

            var fromDate = new DateTime(year, month, 1);
            var toDate = new DateTime(year, month, DateTime.DaysInMonth(year, month));

            var filter = builder.Gte("Date", fromDate) & builder.Lte("Date", toDate);
            return await Collection
                .Find<Transaction>(filter)
                .ToListAsync();
        }
    }
}