using Microsoft.AspNetCore.Identity;

namespace QuestionBank.Models
{
    public class ApplicationUser : IdentityUser
    {
        public List<QuestionUserTag> QuestionUserTags { get; } = new();
    }
}