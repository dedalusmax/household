using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using NetCore.Models;

namespace NetCore.Controllers
{
    public class ToyController : Controller
    {
        private DataAccess _ds;

        public ToyController(DataAccess ds)
        {
            this._ds = ds;
        }

        [HttpGet]
        public IEnumerable<Toy> Get() 
        {
            return this._ds.GetToys();
        }

        [HttpGet]
        public IActionResult GetById(string id)
        {
            var toy = this._ds.GetToy(new ObjectId(id));
            if (toy == null) 
            {
                return NotFound();
            }
            return new ObjectResult(toy);
        }

        [HttpPost]
        public IActionResult Post([FromBody]Toy t)
        {
            this._ds.Create(t);
            return new ObjectResult(t);
        }

        [HttpPut]
        public IActionResult Put(string id, [FromBody]Toy t)
        {
            var recId = new ObjectId(id);
            var toy = this._ds.GetToy(recId);
            if (toy == null) 
            {
                return NotFound();
            }
            this._ds.Update(recId, t);
            return new OkResult();
        }

        [HttpDelete]
        public IActionResult Delete(string id) 
        {
            var toy = this._ds.GetToy(new ObjectId(id));
            if (toy == null) 
            {
                return NotFound();
            }
            this._ds.Remove(toy.Id);
            return new OkResult();
        }
    }
}