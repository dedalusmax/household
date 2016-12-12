using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using NetCore.Data;
using NetCore.Models;

namespace NetCore.Controllers
{
    public class WalletController : Controller
    {
        private readonly IRepository<Wallet> _repo;
    
        public WalletController(IRepository<Wallet> repository)
        {
            _repo = repository;
        }
    
        [HttpGet]
        public async Task<IEnumerable<Wallet>> Get()
        {
            return await _repo.GetAll();
        }
       
        [HttpPost]
        public async Task<Wallet> Post([FromBody]Wallet w)
        {
            var wallet = await _repo.GetAll();
            if (wallet == null) {

                w = new Wallet();
                w.LastUpdated = DateTime.Now;
                
                return await _repo.Create(w) ?? null;

            } else {
                w.LastUpdated = DateTime.Now;
               
                _repo.Update(w.Id.ToString(), w);
                return w;
            }
        }
    
        [HttpDelete]
        public void Delete()
        {
            _repo.RemoveAll();
        }
    }
}