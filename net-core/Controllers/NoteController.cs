using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using NetCore.Models;

namespace NetCore.Controllers
{
    [Route("api/[controller]")]
    public class NoteController : Controller 
    {
        //private static List<Note> _notes;
        private INoteRepository _repo;
        
        // static NoteController()
        // {
        //     _notes = new List<Note>();
        // }
        public NoteController(INoteRepository repo) 
        {
            this._repo = repo;
        }

        [HttpGet]
        public IEnumerable<Note> GetAll()
        {
            //return _notes.AsReadOnly();
            return this._repo.GetAll();
        }

        [HttpGet("{id}", Name = "GetNote")]
        public IActionResult GetById(string id)
        {
            //var item = _notes.Find(n => n.Id == id);
            var item = this._repo.Find(id);

            if (item == null)
            {
                return NotFound();
            }

            return new ObjectResult(item);
        }

        [HttpPost]
        public IActionResult Create([FromBody] Note item)
        {
            if (item == null)
            {
                return BadRequest();
            }

            //item.Id = (_notes.Count + 1).ToString();
            //_notes.Add(item);

            this._repo.Add(item);

            return CreatedAtRoute("GetNote", new { controller = "Note", id = item.Key }, item);
        }

        [HttpDelete("{id}")]
        public void Delete(string id)
        {
            //_notes.RemoveAll(n => n.Id == id);
            this._repo.Remove(id);
        }

        // public class Note
        // {
        //     public string Id { get; set; }
        //     public string Content { get; set; }
        // }
    }
}