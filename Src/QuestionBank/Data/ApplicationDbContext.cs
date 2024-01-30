using Duende.IdentityServer.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using QuestionBank.Models;

namespace QuestionBank.Data
{
    public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions options, IOptions<OperationalStoreOptions> operationalStoreOptions)
            : base(options, operationalStoreOptions)
        {

        }
        public DbSet<QuestionBank.Models.Question> Question { get; set; } = null!;
        public DbSet<QuestionBank.Models.Course> Course { get; set; } = null!;
        public DbSet<QuestionBank.Models.Tag> Tag { get; set; } = null!;
        public DbSet<QuestionBank.Models.QuestionUserTag> QuestionUserTag { get; set; } = null!;
        public DbSet<QuestionBank.Models.QuestionTag> QuestionTag { get; set; } = null!;
        public DbSet<QuestionBank.Models.QuestionCourse> QuestionCourse { get; set; } = null!;
    }
}