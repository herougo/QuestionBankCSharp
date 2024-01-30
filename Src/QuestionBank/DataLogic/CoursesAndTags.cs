using Microsoft.EntityFrameworkCore;
using QuestionBank.Data;
using QuestionBank.Models;

namespace QuestionBank.DataLogic
{
    public class CoursesAndTags
    {
        private readonly ApplicationDbContext _context = null!;

        public CoursesAndTags(ApplicationDbContext context)
        {
            _context = context;
        }

        public void AddCoursesAndTags(int questionId, List<int> courseIds, List<int> tagIds)
        {
            foreach (int tagId in tagIds)
            {
                QuestionTag questionTag = new QuestionTag()
                {
                    QuestionId = questionId,
                    TagId = tagId
                };
                _context.Add(questionTag);
            }
            foreach (int courseId in courseIds)
            {
                QuestionCourse questionCourse = new QuestionCourse()
                {
                    QuestionId = questionId,
                    CourseId = courseId
                };
                _context.Add(questionCourse);
            }
            _context.SaveChanges();
        }

        public Dictionary<int, List<string>> GetQuestionTagMap(HashSet<int>? tagIds)
        {
            IQueryable<int> filteredQuestionIds = _context.QuestionTag
                .Where(x => tagIds == null || tagIds.Contains(x.TagId))
                .Select(x => x.QuestionId);
            List<Tuple<int, int>> questionTags = _context.QuestionTag
                .Where(x => filteredQuestionIds.Contains(x.QuestionId))
                .Select(
                    x => new Tuple<int, int>(x.QuestionId, x.TagId)
                ).ToList();
            List<Tuple<int, string?>> tags = _context.Tag.Select(
                x => new Tuple<int, string?>(x.Id, x.Name)
            ).ToList();

            Dictionary<int, string?> tagIdToTagName = new Dictionary<int, string?>();
            foreach (Tuple<int, string?> element in tags)
            {
                tagIdToTagName[element.Item1] = element.Item2;
            }

            Dictionary<int, List<string>> result = new Dictionary<int, List<string>>();
            foreach (Tuple<int, int> element in questionTags)
            {
                int questionId = element.Item1;
                int tagId = element.Item2;
                string? tagName = tagIdToTagName[tagId];
                if (!result.ContainsKey(questionId))
                {
                    result[questionId] = new List<string>();
                }
                if (tagName != null)
                {
                    result[questionId].Add(tagName);
                }
            }

            return result;
        }

        public Dictionary<int, List<string>> GetQuestionCourseMap(HashSet<int>? courseIds)
        {
            IQueryable<int> filteredQuestionIds = _context.QuestionCourse
                .Where(x => courseIds == null || courseIds.Contains(x.CourseId))
                .Select(x => x.QuestionId);
            List<Tuple<int, int>> questionCourses = _context.QuestionCourse
                .Where(x => filteredQuestionIds.Contains(x.QuestionId))
                .Select(
                    x => new Tuple<int, int>(x.QuestionId, x.CourseId)
                ).ToList();
            List<Tuple<int, string?>> courses = _context.Course.Select(
                x => new Tuple<int, string?>(x.Id, x.Code)
            ).ToList();

            Dictionary<int, string?> courseIdToCourseCodes = new Dictionary<int, string?>();
            foreach (Tuple<int, string?> element in courses)
            {
                courseIdToCourseCodes[element.Item1] = element.Item2;
            }

            Dictionary<int, List<string>> result = new Dictionary<int, List<string>>();
            foreach (Tuple<int, int> element in questionCourses)
            {
                int questionId = element.Item1;
                int courseId = element.Item2;
                string? courseCode = courseIdToCourseCodes[courseId];
                if (!result.ContainsKey(questionId))
                {
                    result[questionId] = new List<string>();
                }
                if (courseCode != null)
                {
                    result[questionId].Add(courseCode);
                }
            }

            return result;
        }
    }
}
