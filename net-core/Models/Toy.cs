using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace NetCore.Models 
{
    public class Toy 
    {
        [BsonId]
        public ObjectId Id { get; set; }

        [BsonElement("Name")]
        public string Name { get; set; }

        [BsonElement("Description")]
        public string Description { get; set; }

        [BsonElement("Price")]
        public double Price { get; set; }
    }
}