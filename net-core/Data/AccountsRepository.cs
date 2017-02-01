using Microsoft.Extensions.Options;
using NetCore.Models;

namespace NetCore.Data
{
    public class AccountsRepository : BaseRepository<Account>
    {
        public AccountsRepository(IOptions<Settings> settings) : base(settings, "accounts") {
        }
    }
}