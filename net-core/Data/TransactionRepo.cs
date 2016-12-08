using Microsoft.Extensions.Options;
using NetCore.Models;

namespace NetCore.Data
{
    public class TransactionRepo : BaseRepository<Transaction>
    {
        public TransactionRepo(IOptions<Settings> settings) : base(settings, "transactions") {
            
        }
    }
}