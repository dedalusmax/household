using System;
using NetCore.Data;

namespace NetCore.Models 
{
    public class Transaction : DataEntity
    {
        public DateTime Date { get; set; } = DateTime.Now;

        public string CostCenter { get; set; } = string.Empty;

        public string Category { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        public double Amount { get; set; } = 0.0;

        public string Account { get; set; } = "GOT";
    }
}