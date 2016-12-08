using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace NetCore.Models 
{
    public class TransactionContext
    {
        private readonly IMongoDatabase _database = null;

        public TransactionContext(IOptions<Settings> settings)
        {
            var client = new MongoClient(settings.Value.ConnectionString);
            if (client != null)
                _database = client.GetDatabase(settings.Value.Database);
        }

        public IMongoCollection<Transaction> Transactions
        {
            get
            {
                return _database.GetCollection<Transaction>("transactions");
            }
        }
    }
}
