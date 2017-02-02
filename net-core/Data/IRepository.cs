using System.Collections.Generic;
using System.Threading.Tasks;

namespace NetCore.Data
{
    public interface IRepository<T> where T : IDataEntity
    {
        Task<IEnumerable<T>> GetAll();

        Task<T> Get(string id);
        
        Task<T> Create(T item);

        Task<bool> Update(string id, T item);

        Task<bool> Remove(string id);
 
        Task<bool> RemoveAll();
    } 
}