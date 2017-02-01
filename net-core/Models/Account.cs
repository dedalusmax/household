using NetCore.Data;

namespace NetCore.Models
{
    public class Account : DataEntity
    {
        public string Name { get; set; }

        public string Code { get; set; }

        public string Type { get; set; }

        public string Currency { get; set; }

        public string Description { get; set; }
    }
}