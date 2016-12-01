using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Builders;

namespace NetCore.Models 
{
    public class DataAccess 
    {
        MongoClient _client;
        MongoServer _server;
        MongoDatabase _db;

        public DataAccess() 
        {
            _client = new MongoClient("mongodb://localhost:27017");
            _server = _client.GetServer();
            _db = _server.GetDatabase("household");
        }

        public IEnumerable<Toy> GetToys()
        {
            return _db.GetCollection<Toy>("toys").FindAll();
        }

        public Toy GetToy(ObjectId id) 
        {
            var res = Query<Toy>.EQ(p => p.Id, id);
            return _db.GetCollection<Toy>("toys").FindOne(res);
        }

        public Toy Create(Toy t)
        {
            _db.GetCollection<Toy>("toys").Save(t);
            return t;
        }

        public void Update(ObjectId id, Toy t)
        {
            t.Id = id;
            var res = Query<Toy>.EQ(p => p.Id, id);
            var operation = Update<Toy>.Replace(t);
            _db.GetCollection<Toy>("toys").Update(res, operation);
        }

        public void Remove(ObjectId id) 
        {
            var res = Query<Toy>.EQ(p => p.Id, id);
            _db.GetCollection<Toy>("toys").Remove(res);    
        }
    }
}