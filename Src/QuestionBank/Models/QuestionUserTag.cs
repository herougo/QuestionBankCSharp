namespace QuestionBank.Models
{
    public class QuestionUserTag
    {
        public int Id { get; set; }
        public int QuestionId { get; set; }
        public string UserId { get; set; } = null!;
        public int TagId { get; set; }
        public Question Question { get; set; } = null!;
        public ApplicationUser User { get; set; } = null!;
        public Tag Tag { get; set; } = null!;
    }
}
