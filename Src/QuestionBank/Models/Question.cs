namespace QuestionBank.Models
{
    public class Question
    {
        public int Id { get; set; }
        public string? QuestionText { get; set; }
        public string? AnswerText { get; set; }
        public List<QuestionTag> QuestionTags { get; } = new();
        public List<QuestionCourse> QuestionCourses { get; } = new();
        public List<QuestionUserTag> QuestionUserTags { get; } = new();
    }
}
