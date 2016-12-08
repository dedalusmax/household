using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace NetCore.Data 
{
    public interface IDataEntity 
    {
        [BsonId]
        ObjectId Id { get; set; }
    }
}