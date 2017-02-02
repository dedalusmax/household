using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
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
        public async Task<Wallet> Store([FromBody]Wallet w)
        {
            if (w.LastUpdated == DateTime.MinValue) {
                w.LastUpdated = DateTime.Now;
            }
            var wallet = await _repo.GetAll() as List<Wallet>;
            if (wallet.Count() == 0) {
                return await _repo.Create(w) ?? null;
            } else {             
                await _repo.Update(w.Id.ToString(), w);
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