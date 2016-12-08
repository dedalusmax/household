using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;
using NetCore.Data;

namespace NetCore.Models 
{
    public class TransactionRepository : ITransactionRepository
    {
        private readonly DataContext _context = null;
    
        private readonly IMongoCollection<Transaction> _transactions;

        public TransactionRepository(IOptions<Settings> settings)
        {
            _context = new DataContext(settings);
            _transactions = _context.GetCollection<Transaction>("transactions");
        }
    
        public async Task<IEnumerable<Transaction>> GetAllTransactions()
        {
            return await _transactions
                .Find(_ => true)
                .ToListAsync();
        }
    
        public async Task<Transaction> GetTransaction(string id)
        {
            var filter = Builders<Transaction>.Filter.Eq("Id", id);
            return await _transactions
                .Find(filter)
                .FirstOrDefaultAsync();
        }
    
        public async void AddTransaction(Transaction item)
        {
            await _transactions.InsertOneAsync(item);
        }
    
        public async Task<bool> RemoveTransaction(string id)
        {
            var result = await _transactions.DeleteOneAsync(
                        Builders<Transaction>.Filter.Eq("Id", id));
    
            return result.DeletedCount > 0;
        }
    
        // public async Task<UpdateResult> UpdateTransaction(string id, string costCenter, string category, string description, double amount, string account)
        // {
        //     var filter = Builders<Transaction>.Filter.Eq("Id", id);
        //     var update = Builders<Transaction>.Update
        //                         .Set(s => s.CostCenter, costCenter)
        //                         .Set(s => s.Category, category)
        //                         .Set(s => s.Description, description)
        //                         .Set(s => s.Amount, amount)
        //                         .Set(s => s.Account, account)
        //                         .CurrentDate(s => s.Date);
        //     return await _transactions.UpdateOneAsync(filter, update);
        // }

        public async void UpdateTransaction(string id, Transaction t)
        {
            await _transactions.ReplaceOneAsync(n => n.Id.Equals(id), t, new UpdateOptions() { IsUpsert = true });
        }
    
        public void RemoveAllTransactions()
        {
            _transactions.DeleteManyAsync(new BsonDocument());
        }
    }    
}