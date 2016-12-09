using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using NetCore.Models;

namespace NetCore.Data
{
    public class ProfileRepository : BaseRepository<Profile>
    {
        public ProfileRepository(IOptions<Settings> settings) : base(settings, "profiles") {          
        }

        public async Task<Profile> GetProfile(string username, string password)
        {
            var builder = Builders<Profile>.Filter;
            var filter = builder.Eq("Username", username) & builder.Eq("Password", password);
            return await Collection
                .Find<Profile>(filter)
                .FirstOrDefaultAsync();
        }
    }
}