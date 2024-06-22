using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WordPal.Migrations
{
    /// <inheritdoc />
    public partial class RenameEmailToPassword : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Email",
                table: "Users",
                newName: "Password");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Password",
                table: "Users",
                newName: "Email");
        }
    }
}
