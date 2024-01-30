using QuestionBank.Data;
using QuestionBank.Models;
using System.Collections.Generic;

namespace QuestionBank.DataLogic
{
    public class DoneTag
    {
        private readonly ApplicationDbContext _context = null!;
        
        public DoneTag(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<QuestionUserTag> GetMatchingQUTs(int questionId, string userId)
        {
            List<QuestionUserTag> result = _context.QuestionUserTag.Where(
                x => (
                    x.QuestionId == questionId
                    && x.TagId == Constants.DoneId
                    && x.UserId == userId
                )
            ).ToList();
            return result;
        }

        public void MarkAsDone(int questionId, string userId)
        {
            bool isDone = GetMatchingQUTs(questionId, userId).Count() > 0;
            if (isDone)
            {
                throw new Exception("already marked as done");
            }
            QuestionUserTag questionUserTag = new QuestionUserTag()
            {
                QuestionId = questionId,
                UserId = userId,
                TagId = Constants.DoneId
            };
            _context.Add(questionUserTag);
            _context.SaveChanges();
        }

        public void MarkAsNotDone(int questionId, string userId)
        {
            List<QuestionUserTag> matchingQUTs = GetMatchingQUTs(questionId, userId);
            bool isDone = matchingQUTs.Count() > 0;
            if (!isDone)
            {
                throw new Exception("already not marked as done");
            }
            _context.QuestionUserTag.RemoveRange(matchingQUTs);
            _context.SaveChanges();
        }

        public List<int> GetDoneQuestionIds(string userId)
        {
            List<int> results = _context.QuestionUserTag
                .Where(x => x.UserId == userId && x.TagId == Constants.DoneId)
                .Select(x => x.QuestionId)
                .ToList();
            return results;
        }
    }
}
