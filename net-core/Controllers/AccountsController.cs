using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using NetCore.Data;
using NetCore.Models;

namespace NetCore.Controllers
{
    public class AccountsController : Controller
    {
        private readonly IRepository<Account> _repo;
    
        public AccountsController(IRepository<Account> repository)
        {
            _repo = repository;
        }

        [HttpGet]
        public async Task<IEnumerable<Account>> Get()
        {
            return await _repo.GetAll();
        }

        [HttpPost]
        public async Task<Account> Add([FromBody]Account account)
        {
            return await _repo.Create(account);
        }

        [HttpDelete]
        public void DeleteAll()
        {
            _repo.RemoveAll();
        }
    }
}