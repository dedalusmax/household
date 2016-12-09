using Microsoft.Extensions.Options;
using NetCore.Models;

namespace NetCore.Data
{
    public class TransactionRepository : BaseRepository<Transaction>
    {
        public TransactionRepository(IOptions<Settings> settings) : base(settings, "transactions") {
            
        }
    }
}