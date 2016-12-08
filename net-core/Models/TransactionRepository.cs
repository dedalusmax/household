using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;

namespace NetCore.Models 
{
    public class TransactionRepository : ITransactionRepository
    {
        private readonly TransactionContext _context = null;
    
        public TransactionRepository(IOptions<Settings> settings)
        {
            _context = new TransactionContext(settings);
        }
    
        public async Task<IEnumerable<Transaction>> GetAllTransactions()
        {
            var documents = await _context.Transactions.Find(_ => true)
                                .ToListAsync();
            return documents;
        }
    
        public async Task<Transaction> GetTransaction(string id)
        {
            var filter = Builders<Transaction>.Filter.Eq("Id", id);
            return await _context.Transactions.Find(filter).FirstOrDefaultAsync();
        }
    
        public async void AddTransaction(Transaction item)
        {
            await _context.Transactions.InsertOneAsync(item);
        }
    
        public async Task<bool> RemoveTransaction(string id)
        {
            var result = await _context.Transactions.DeleteOneAsync(
                        Builders<Transaction>.Filter.Eq("Id", id));
    
            return result.DeletedCount > 0;
        }
    
        public async void UpdateTransaction(string id, string costCenter, string category, string description, double amount, string account)
        {
            var filter = Builders<Transaction>.Filter.Eq("Id", id);
            var update = Builders<Transaction>.Update
                                .Set(s => s.CostCenter, costCenter)
                                .Set(s => s.Category, category)
                                .Set(s => s.Description, description)
                                .Set(s => s.Amount, amount)
                                .Set(s => s.Account, account)
                                .CurrentDate(s => s.Date);
            var result = await _context.Transactions.UpdateOneAsync(filter, update);
        }
    
        public void RemoveAllTransactions()
        {
            _context.Transactions.DeleteManyAsync(new BsonDocument());
        }
    }    
}