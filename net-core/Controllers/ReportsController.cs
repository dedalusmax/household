using System;
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

                report.CreatedDate = DateTime.Now;
                report.Year = year;
                report.Month = month;

                return await _repo.Create(report) ?? null;

            } else {
                report.CreatedDate = DateTime.Now;
                
                _repo.Update(report.Id.ToString(), report);
                return report;
            }

            // var report = await _repo.GetMonthlyBudget(year, month) ?? new MonthlyBudget() {
            //     CreatedDate = DateTime.Now,
            //     Year = year,
            //     Month = month
            // };

            //return await _repo.Create(report) ?? null;
        }
    }
}