using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace NetCore.Models
{
    public class Account 
    {
        [BsonId]
        public ObjectId Id { get; set; }

        public string Mark { get; set; } = "GOT";

        public string Name { get; set; } = string.Empty;

        public double Balance { get; set; } = 0.0;

        public string Currency { get; set; } = "HRK";
    }
}