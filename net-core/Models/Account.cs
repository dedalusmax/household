using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace NetCore.Models 
{
    public class Account 
    {
        public ObjectId Id { get; set; }

        [BsonElement("Name")]
        public string Name { get; set; }

        [BsonElement("FullName")]
        public string FullName { get; set; }

        [BsonElement("OIB")]
        public int OIB { get; set; }

        [BsonElement("Address")]
        public string Address { get; set; }

        [BsonElement("Address2")]
        public string Address2 { get; set; }

        [BsonElement("Phone")]
        public string Phone { get; set; }

        [BsonElement("Email")]
        public string Email { get; set; }

        [BsonElement("Owner")]
        public string Owner { get; set; }

        [BsonElement("Contact")]
        public string Contact { get; set; }
    }
}