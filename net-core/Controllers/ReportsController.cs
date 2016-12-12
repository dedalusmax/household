using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using NetCore.Data;
using NetCore.Models;

namespace NetCore.Controllers
{
    public class ReportsController : Controller
    {
        private readonly ReportsRepository _repo;
        private readonly TransactionRepository _transactionRepo;

        public ReportsController(ReportsRepository repository, IServiceProvider services)
        {
            _repo = repository;
            _transactionRepo = (TransactionRepository)services.GetService(typeof(IRepository<Transaction>));
        }

        [HttpGet]
        public Task<MonthlyBudget> GetMonthlyBudget(int year, int month)
        {
            return GetMonthlyBudgetAsync(year, month);
        }

        private async Task<MonthlyBudget> GetMonthlyBudgetAsync(int year, int month)
        {
            return await _repo.GetMonthlyBudget(year, month) ?? null;
        }

        [HttpPost]
        public async Task<MonthlyBudget> CreateMonthlyBudget(int year, int month)
        {
            var report = await _repo.GetMonthlyBudget(year, month);
            if (report == null) {

                report = new MonthlyBudget();

                report.Year = year;
                report.Month = month;

                report = await GenerateReport(report);

                return await _repo.Create(report) ?? null;

            } else {
                report.Clean();

                report = await GenerateReport(report);
                
                _repo.Update(report.Id.ToString(), report);
                return report;
            }
        }

        private async Task<MonthlyBudget> GenerateReport(MonthlyBudget report) 
        {
            report.CreatedDate = DateTime.Now;

            var transactions = await _transactionRepo.GetForMonth(report.Year, report.Month);

            foreach (var transaction in transactions) 
            {
                if (transaction.Category.Contains("TRANSFER")) {
                    // ignore this document
                } else if (transaction.Category.StartsWith("R")) {
                    AddInCollection(transaction, report.Income);
                } else if (transaction.Category.StartsWith("A") || transaction.Category.StartsWith("B") || transaction.Category.StartsWith("C")) {
                    AddInCollection(transaction, report.Expenses);
                } else if (transaction.Category.StartsWith("D")) {
                    AddInCollection(transaction, report.Debts);
                } else {
                    AddInCollection(transaction, report.Outages);
                }
            }

            report.IncomeTotal = SumCollection(report.Income);
            report.ExpensesTotal = SumCollection(report.Expenses);
            report.Total = report.IncomeTotal - report.ExpensesTotal;
            report.DebtsTotal = SumCollection(report.Debts);           
            report.CleanTotal = report.Total - report.DebtsTotal;
            report.OutagesTotal = SumCollection(report.Outages);

            return report;
        }

        private void AddInCollection(Transaction transaction, List<CategorySummary> collection) 
        {
            var category = collection.Find(c => c.Category == transaction.Category);
            if (category == null) {
                collection.Add(new CategorySummary() {
                    Category = transaction.Category,
                    Sum = transaction.Amount,
                    Notes = transaction.Description 
                });
            } else {
                category.Sum += transaction.Amount;
                category.Notes += ", " + transaction.Description;
            }
        }

        private double SumCollection(List<CategorySummary> collection) 
        {
            var total = 0.0;
            foreach (var item in collection) {
                total += item.Sum;
            }
            return total;
        }

        [HttpDelete]
        public async void DeleteMonthlyBudget(int year, int month)
        {
            await _repo.DeleteMonthlyBudget(year, month);
        }
    }
}