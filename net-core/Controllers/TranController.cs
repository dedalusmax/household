using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using NetCore.Data;
using NetCore.Models;

namespace NetCore.Controllers
{
    public class TranController : Controller
    {
        private readonly IRepository<Transaction> _repo;
    
        public TranController(IRepository<Transaction> repository)
        {
            _repo = repository;
        }
    
        [HttpGet]
        public Task<IEnumerable<Transaction>> Get()
        {
            return GetTransactionAsync();
        }
    
        private async Task<IEnumerable<Transaction>> GetTransactionAsync()
        {
            return await _repo.GetAll();
        }
    
        [HttpGet]
        public Task<Transaction> GetById(string id)
        {
            return GetTransactionByIdAsync(id);
        }
    
        private async Task<Transaction> GetTransactionByIdAsync(string id)
        {
            return await _repo.Get(id) ?? null;
        }
    
        [HttpGet]
        public List<string> GetCostCenters()
        {
            return ((TransactionRepository)_repo).GetCostCenters();
        }

        [HttpGet]
        public List<string> GetCategories()
        {
            return ((TransactionRepository)_repo).GetCategories();
        }

        [HttpGet]
        public List<string> GetDescriptions()
        {
            return ((TransactionRepository)_repo).GetDescriptions();
        }

        [HttpPost]
        public void Post([FromBody]Transaction t)
        {
            // _repo.Create(new Transaction() { 
            //     Date = t.Date,
            //     CostCenter = t.CostCenter,
            //     Category = t.Category, 
            //     Description = t.Description,
            //     Amount = t.Amount,
            //     Account = t.Account
            // });
            _repo.Create(t);
        }
    
        [HttpPut]
        public void Put(string id, [FromBody]Transaction t)
        {
            _repo.Update(id, t);
        }
    
        [HttpDelete]
        public void Delete(string id)
        {
            _repo.Remove(id);
        }

        [HttpDelete]
        public async Task<bool> DeleteAll()
        {
            return await _repo.RemoveAll();
        }
    }
}