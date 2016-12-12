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

        public double IncomeTotal { get; set; } = 0.0;

        public List<CategorySummary> Expenses { get; set; }

        public double ExpensesTotal { get; set; } = 0.0;

        public double Total { get; set; } = 0.0;

        public List<CategorySummary> Debts { get; set; }

        public double DebtsTotal { get; set; } = 0.0;

        public double CleanTotal { get; set; } = 0.0;

        public List<CategorySummary> Outages { get; set; }

        public double OutagesTotal { get; set; } = 0.0;

        public List<Account> AccountsBalance { get; set; }

        public MonthlyBudget() {
            Income = new List<CategorySummary>();
            Expenses = new List<CategorySummary>();
            Debts = new List<CategorySummary>();
            Outages = new List<CategorySummary>();
            AccountsBalance = new List<Account>();
        }

        public void Clean() 
        {
            Income.Clear(); 
            IncomeTotal = 0.0;
            Expenses.Clear();
            ExpensesTotal = 0.0;
            Total = 0.0;
            Debts.Clear();
            DebtsTotal = 0.0;
            CleanTotal = 0.0;
            Outages.Clear();
            OutagesTotal = 0.0;
            AccountsBalance.Clear();
        }
    }
}