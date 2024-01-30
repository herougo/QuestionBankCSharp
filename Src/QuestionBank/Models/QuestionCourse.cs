using Microsoft.Extensions.Hosting;

namespace QuestionBank.Models
{
    public class QuestionCourse
    {
        public int Id { get; set; }
        public int QuestionId { get; set; }
        public int CourseId { get; set; }
        public Question Question { get; set; } = null!;
        public Course Course { get; set; } = null!;
    }
}
