namespace QuestionBank.Controllers.ReturnResults
{
    public class FilteredQuestionReturnResult
    {
        public int Id { get; set; }
        public string? QuestionText { get; set; }
        public string? AnswerText { get; set; }
        public bool Done { get; set; }
        public List<string>? Courses { get; set; }
        public List<string>? Tags { get; set; }
    }
}
