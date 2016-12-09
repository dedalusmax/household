using System;
using System.Collections.Generic;
using MongoDB.Bson.Serialization.Attributes;
using NetCore.Data;

namespace NetCore.Models 
{
    public class Profile : DataEntity
    {
        public string Username { get; set; }

        public string Password { get; set; }

        public string Email { get; set; }

        public DateTime CreatedDate { get; set; }

        [BsonIgnoreIfDefault]
        public DateTime LastLoginDate { get; set; }

        public List<Account> CurrentBalance { get; set; }

        public Profile() 
        {
            CurrentBalance = new List<Account>();
            CurrentBalance.Add(new Account() { Name = "GOT", Amount = 0.00 } );
        }
    }
}