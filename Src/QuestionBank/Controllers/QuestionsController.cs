using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using QuestionBank.Controllers.ReturnResults;
using QuestionBank.Data;
using QuestionBank.DataLogic;
using QuestionBank.Models;
using QuestionBank.Utils;

namespace QuestionBank.Controllers
{
    public class QuestionsController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly DoneTag _doneTag;
        private readonly CoursesAndTags _coursesAndTags;

        public QuestionsController(ApplicationDbContext context)
        {
            _context = context;
            _doneTag = new DoneTag(context);
            _coursesAndTags = new CoursesAndTags(context);
        }

        // GET: Questions
        public async Task<IActionResult> Index()
        {
              return _context.Question != null ? 
                          View(await _context.Question.ToListAsync()) :
                          Problem("Entity set 'ApplicationDbContext.Question'  is null.");
        }

        // GET: Questions/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.Question == null)
            {
                return NotFound();
            }

            var question = await _context.Question
                .FirstOrDefaultAsync(m => m.Id == id);
            if (question == null)
            {
                return NotFound();
            }

            return View(question);
        }

        // POST: Questions/Create
        [HttpPost]
        public async Task<IActionResult> Create()
        {
            if (!ModelState.IsValid)
            {
                throw new Exception("Invalid ModelState");
            }
            StreamReader requestReader = new StreamReader(Request.Body);
            JObject request = JObject.Parse(await requestReader.ReadToEndAsync());
            Question question = new Question()
            {
                QuestionText = request["QuestionText"]?.ToString(),
                AnswerText = request["AnswerText"]?.ToString()
            };

            _context.Add(question);
            await _context.SaveChangesAsync();

            _coursesAndTags.AddCoursesAndTags(
                question.Id,
                request["Courses"]?.ToObject<List<int>>(),
                request["Tags"]?.ToObject<List<int>>()
            );

            return new EmptyResult();

        }

        // GET: Questions/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.Question == null)
            {
                return NotFound();
            }

            var question = await _context.Question.FindAsync(id);
            if (question == null)
            {
                return NotFound();
            }
            return View(question);
        }

        // POST: Questions/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,QuestionText,AnswerText")] Question question)
        {
            if (id != question.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(question);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!QuestionExists(question.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return View(question);
        }

        // GET: Questions/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.Question == null)
            {
                return NotFound();
            }

            var question = await _context.Question
                .FirstOrDefaultAsync(m => m.Id == id);
            if (question == null)
            {
                return NotFound();
            }

            return View(question);
        }

        // POST: Questions/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.Question == null)
            {
                return Problem("Entity set 'ApplicationDbContext.Question'  is null.");
            }
            var question = await _context.Question.FindAsync(id);
            if (question != null)
            {
                _context.Question.Remove(question);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool QuestionExists(int id)
        {
          return (_context.Question?.Any(e => e.Id == id)).GetValueOrDefault();
        }

        [Authorize]
        [HttpPost]
        async public Task<IEnumerable<FilteredQuestionReturnResult>> Filtered()
        {
            // TODO: improve performance
            StreamReader requestReader = new StreamReader(Request.Body);
            JObject request = JObject.Parse(await requestReader.ReadToEndAsync());

            HashSet<int>? courseIds = request["courses"]?.ToObject<HashSet<int>>();
            if (courseIds != null && courseIds.Count == 0)
            {
                courseIds = null;
            }
            HashSet<int>? tagIds = request["tags"]?.ToObject<HashSet<int>>();
            if (tagIds != null && tagIds.Count == 0)
            {
                tagIds = null;
            }

            string currentUserId = User.GetUserId();
            HashSet<int> doneQuestionIds = _doneTag.GetDoneQuestionIds(currentUserId).ToHashSet<int>();
            Dictionary<int, List<string>> questionTagMap = _coursesAndTags.GetQuestionTagMap(tagIds);
            Dictionary<int, List<string>> questionCourseMap = _coursesAndTags.GetQuestionCourseMap(courseIds);
            
            IQueryable<Question> questions = _context.Question;
            if (tagIds != null)
            {
                // x => questionTagMap.ContainsKey(x.Id) cannot be translated
                List<int> filteredQuestionIds = questionTagMap.Keys.ToList<int>();
                questions = questions.Where(x => filteredQuestionIds.Contains(x.Id));
            }
            if (courseIds != null)
            {
                List<int> filteredQuestionIds = questionCourseMap.Keys.ToList<int>();
                questions = questions.Where(x => filteredQuestionIds.Contains(x.Id));
            }

            IEnumerable<FilteredQuestionReturnResult> result = questions
                .Select(x => new FilteredQuestionReturnResult
                {
                    Id = x.Id,
                    QuestionText = x.QuestionText,
                    AnswerText = x.AnswerText,
                    Done = doneQuestionIds.Contains(x.Id),
                    Courses = questionCourseMap.ContainsKey(x.Id) ? questionCourseMap[x.Id] : null,
                    Tags = questionTagMap.ContainsKey(x.Id) ? questionTagMap[x.Id] : null
                })
                .ToArray();
            return result;
        }

        // POST: Questions/MarkAsDone/5
        [Authorize]
        [HttpPost]
        public IActionResult MarkAsDone(int id)
        {
            string currentUserId = User.GetUserId();
            _doneTag.MarkAsDone(id, currentUserId);
            return new EmptyResult();
        }

        // POST: Questions/MarkAsNotDone/5
        [Authorize]
        [HttpPost]
        public IActionResult MarkAsNotDone(int id)
        {
            string currentUserId = User.GetUserId();
            _doneTag.MarkAsNotDone(id, currentUserId);
            return new EmptyResult();
        }
    }
}
