using Microsoft.Extensions.Hosting;

namespace QuestionBank.Models
{
    public class QuestionTag
    {
        public int Id { get; set; }
        public int QuestionId { get; set; }
        public int TagId { get; set; }
        public Question Question { get; set; } = null!;
        public Tag Tag { get; set; } = null!;
    }
}
