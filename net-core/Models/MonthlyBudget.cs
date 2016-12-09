using System;
using System.Collections.Generic;
using NetCore.Data;

namespace NetCore.Models
{
    public class MonthlyBudget : DataEntity
    {
        public DateTime CreatedDate { get; set; }

        public int Year { get; set; }

        public int Month { get; set; }

        public List<CategorySummary> Income { get; set; }

        public List<CategorySummary> Expenses { get; set; }

        public double Total { get; set; } = 0.0;

        public List<CategorySummary> Debts { get; set; }

        public double CleanTotal { get; set; } = 0.0;

        public List<CategorySummary> Outages { get; set; }

        public List<Account> AccountsBalance { get; set; }

        public MonthlyBudget() {
            Income = new List<CategorySummary>();
            Expenses = new List<CategorySummary>();
            AccountsBalance = new List<Account>();
        }
    }
}