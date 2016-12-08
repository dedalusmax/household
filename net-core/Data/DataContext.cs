using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace NetCore.Data 
{
    public class DataContext
    {
        private readonly IMongoDatabase _database = null;

        public DataContext(IOptions<Settings> settings)
        {
            var client = new MongoClient(settings.Value.ConnectionString);
            if (client != null)
                _database = client.GetDatabase(settings.Value.Database);
        }

        public IMongoCollection<T> GetCollection<T>(string name)
        {
            return _database.GetCollection<T>(name);
        }
    }
}
