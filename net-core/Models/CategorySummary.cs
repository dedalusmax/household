namespace NetCore.Models 
{
    public class CategorySummary
    {
        public string Category { get; set; } 

        public double Sum { get; set; } = 0.0;

        public string Notes { get; set; }
    }
}