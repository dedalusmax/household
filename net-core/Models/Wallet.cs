using System;
using System.Collections.Generic;
using NetCore.Data;

namespace NetCore.Models
{
    public class Wallet : DataEntity
    {
        public DateTime LastUpdated { get; set; }

        public List<Account> CurrentBalance { get; set; }

        public Wallet() 
        {
            CurrentBalance = new List<Account>();
        }
    }
}