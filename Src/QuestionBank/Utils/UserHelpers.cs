using System.Security.Claims;
using System.Security.Principal;

namespace QuestionBank.Utils
{
    public static class UserHelpers
    {
        public static string GetUserId(this IPrincipal principal)
        {
            if (principal.Identity == null)
            {
                return "";
            }
            ClaimsIdentity claimsIdentity = (ClaimsIdentity)principal.Identity;
            Claim claim = claimsIdentity.FindFirst(ClaimTypes.NameIdentifier);
            if (claim == null)
            {
                return "";
            }
            return claim.Value;
        }
    }
}
