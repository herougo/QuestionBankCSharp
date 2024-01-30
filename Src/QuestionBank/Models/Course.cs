namespace QuestionBank.Models
{
    public class Course
    {
        public int Id { get; set; }
        public string? Code { get; set; }
        public string? Title { get; set; }
        public List<QuestionCourse> QuestionCourses { get; } = new();
    }
}
