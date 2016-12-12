using Microsoft.Extensions.Options;
using NetCore.Models;

namespace NetCore.Data
{
    public class WalletRepository : BaseRepository<Wallet>
    {
        public WalletRepository(IOptions<Settings> settings) : base(settings, "wallet") {
        }
    }
}