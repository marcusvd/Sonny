using Domain.Entities.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Repository.Data.RelationshipEntities
{

    #region UserRole
    public class IdentityUserRoleFluentApi : IEntityTypeConfiguration<UserRole>
    {
        public void Configure(EntityTypeBuilder<UserRole> builder)
        {
            builder.ToTable("aspnetUserRoles").HasKey(usr => new { usr.UserId, usr.RoleId });
        }
    }

    #endregion

    #region IdentityUserLogin
    public class IdentityUserLoginFluentApi : IEntityTypeConfiguration<IdentityUserLogin<int>>
    {
        public void Configure(EntityTypeBuilder<IdentityUserLogin<int>> builder)
        {

            builder.ToTable("aspnetUserLogins");
            builder.HasKey(x => x.UserId);
        }
    }
    #endregion

    #region IdentityUserToken
    public class IdentityUserTokenFluentApi : IEntityTypeConfiguration<IdentityUserToken<int>>
    {
        public void Configure(EntityTypeBuilder<IdentityUserToken<int>> builder)
        {
            // builder.ToTable("aspnetUserTokens");
            // builder.HasKey(x => x.UserId);

            builder.HasKey(x => new { x.UserId, x.LoginProvider, x.Name });
            builder.ToTable("AspNetUserTokens");


        }
    }
    #endregion

    #region IdentityUserClaim
    public class IdentityUserClaimFluentApi : IEntityTypeConfiguration<IdentityUserClaim<int>>
    {
        public void Configure(EntityTypeBuilder<IdentityUserClaim<int>> builder)
        {
            builder.ToTable("aspnetUserClaims");
        }
    }

    #endregion
    #region IdentityUser
    public class IdentityUserFluentApi : IEntityTypeConfiguration<IdentityUser<int>>
    {
        public void Configure(EntityTypeBuilder<IdentityUser<int>> builder)
        {
            builder.ToTable("aspnetUsers");
        }
    }

    #endregion

    #region IdentityRole
    public class IdentityRoleFluentApi : IEntityTypeConfiguration<IdentityRole<int>>
    {
        public void Configure(EntityTypeBuilder<IdentityRole<int>> builder)
        {
            builder.ToTable("aspnetRoles");
        }
    }

    #endregion

    #region RoleClaims
    public class IdentityRoleClaimsFluentApi : IEntityTypeConfiguration<IdentityRoleClaim<int>>
    {
        public void Configure(EntityTypeBuilder<IdentityRoleClaim<int>> builder)
        {
            builder.ToTable("aspnetRoleClaims");
        }
    }

    #endregion


}