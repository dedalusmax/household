using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace NetCore.Data 
{
    public class DataEntity : IDataEntity
    {
        [BsonId]
        public ObjectId Id { get; set; }
    }
}