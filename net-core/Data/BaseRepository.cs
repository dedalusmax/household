using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;

namespace NetCore.Data
{
    public abstract class BaseRepository<T> : IRepository<T> where T : IDataEntity
    {
        private readonly DataContext _context = null;
    
        protected readonly IMongoCollection<T> Collection;

        public BaseRepository(IOptions<Settings> settings, string collectionName)
        {
            _context = new DataContext(settings);
            Collection = _context.GetCollection<T>(collectionName);
        }

        public async Task<IEnumerable<T>> GetAll()
        {
            var filter = Builders<T>.Filter.Empty;
            return await Collection
                .Find<T>(filter)
                .ToListAsync();
        }

        public async Task<T> Get(string id)
        {
            var filter = Builders<T>.Filter.Eq("Id", new ObjectId(id));
            return await Collection
                .Find<T>(filter)
                .FirstOrDefaultAsync();
        }

        public async Task<T> Create(T item)
        {
            await Collection.InsertOneAsync(item);
            return item;
        }

        public async void Update(string id, T item)
        {
            item.Id = new ObjectId(id);
            var filter = Builders<T>.Filter.Eq("Id", new ObjectId(id));
            await Collection.ReplaceOneAsync(filter, item, new UpdateOptions { IsUpsert = true });
        }

        public async Task<bool> Remove(string id)
        {
            var filter = Builders<T>.Filter.Eq("Id", new ObjectId(id));
            var result = await Collection.DeleteOneAsync(filter);
            return result.DeletedCount > 0;
        }

        public void RemoveAll()
        {
            Collection.DeleteManyAsync(new BsonDocument());
        }
    }
}