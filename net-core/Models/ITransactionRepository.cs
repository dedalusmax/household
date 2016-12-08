using System.Collections.Generic;
using System.Threading.Tasks;

namespace NetCore.Models 
{
    public interface ITransactionRepository
    {
        Task<IEnumerable<Transaction>> GetAllTransactions();
        Task<Transaction> GetTransaction(string id);
        void AddTransaction(Transaction item);
        Task<bool> RemoveTransaction(string id);
        void UpdateTransaction(string id, string costCenter, string category, string description, double amount, string account);
 
        // it should be cautiously used (only in relation with development tests)
        void RemoveAllTransactions();
    } 
}