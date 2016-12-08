using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using NetCore.Models;

namespace NetCore.Controllers
{
    public class TransactionsController : Controller
    {
        private readonly ITransactionRepository _repo;
    
        public TransactionsController(ITransactionRepository TransactionRepository)
        {
            _repo = TransactionRepository;
        }
    
        [HttpGet]
        public Task<IEnumerable<Transaction>> Get()
        {
            return GetTransactionAsync();
        }
    
        private async Task<IEnumerable<Transaction>> GetTransactionAsync()
        {
            return await _repo.GetAllTransactions();
        }
    
        [HttpGet("{id}")]
        public Task<Transaction> Get(string id)
        {
            return GetTransactionByIdAsync(id);
        }
    
        private async Task<Transaction> GetTransactionByIdAsync(string id)
        {
            return await _repo.GetTransaction(id) ?? new Transaction();
        }
    
        [HttpPost]
        public void Post([FromBody]Transaction t)
        {
            _repo.AddTransaction(new Transaction() { 
                Date = t.Date,
                CostCenter = t.CostCenter,
                Category = t.Category, 
                Description = t.Description,
                Amount = t.Amount,
                Account = t.Account
            });
        }
    
        [HttpPut("{id}")]
        public void Put(string id, [FromBody]Transaction t)
        {
            _repo.UpdateTransaction(id, t);
        }
    
        [HttpDelete("{id}")]
        public void Delete(string id)
        {
            _repo.RemoveTransaction(id);
        }
    }
}