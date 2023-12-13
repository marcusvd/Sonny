using Microsoft.EntityFrameworkCore.Migrations;

namespace Repository.Migrations
{
    public partial class dasw : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Fuel",
                table: "MN_PhysicallyMovingCosts",
                newName: "CollectDeliverOwn");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "CollectDeliverOwn",
                table: "MN_PhysicallyMovingCosts",
                newName: "Fuel");
        }
    }
}
