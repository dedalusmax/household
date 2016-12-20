using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using NetCore.Data;
using NetCore.Models;

namespace NetCore.Controllers
{
    public class ProfileController : Controller
    {
        private readonly ProfileRepository _repo;
    
        public ProfileController(ProfileRepository repository)
        {
            _repo = repository;
        }
    
        [HttpPost]
        public Task<Profile> Login([FromBody]Profile profile)
        {
            return LoginAsync(profile.Username, profile.Password);
        }
    
        private async Task<Profile> LoginAsync(string username, string password)
        {
            return await _repo.GetProfile(username, password) ?? null;
        }
    
        [HttpPost]
        public async Task<Profile> Register([FromBody]Profile profile)
        {
            return await _repo.Create(profile);
        }
    
        [HttpPut]
        public void Change(string id, [FromBody]Profile profile)
        {
            _repo.Update(id, profile);
        }

        [HttpDelete]
        public async void Delete(string id)
        {
            await _repo.Remove(id);
        }

        [HttpDelete]
        public void DeleteAll()
        {
            _repo.RemoveAll();
        }
    }
}