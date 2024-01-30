using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace QuestionBank.Data.Migrations
{
    public partial class AddUserQuestionTag : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "UserQuestionTag",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ApplicationUserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    QuestionTagId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserQuestionTag", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserQuestionTag_AspNetUsers_ApplicationUserId",
                        column: x => x.ApplicationUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserQuestionTag_QuestionTag_QuestionTagId",
                        column: x => x.QuestionTagId,
                        principalTable: "QuestionTag",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserQuestionTag_ApplicationUserId",
                table: "UserQuestionTag",
                column: "ApplicationUserId");

            migrationBuilder.CreateIndex(
                name: "IX_UserQuestionTag_QuestionTagId",
                table: "UserQuestionTag",
                column: "QuestionTagId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserQuestionTag");
        }
    }
}
