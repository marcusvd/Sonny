using Domain.Entities.RemoteCmd;
using Domain.Entities.Shared;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Repository.Data.RelationshipEntities
{

    #region RemoteCmdMachine
    public class RemoteCmdMachineApi : IEntityTypeConfiguration<RemoteCmdMachine>
    {
        public void Configure(EntityTypeBuilder<RemoteCmdMachine> builder)
        {
            builder.HasMany(x => x.Targets)
            .WithOne(x => x.RemoteCmdMachine)
            .HasForeignKey(x => x.RemoteCmdMachineId);


        }
    }

    #endregion
    #region Target
    public class TargetApi : IEntityTypeConfiguration<Target>
    {
        public void Configure(EntityTypeBuilder<Target> builder)
        {
            builder.HasMany(x => x.ResultsExecutedCommands)
            .WithOne(x => x.Target)
            .HasForeignKey(x => x.TargetId);
        }
    }

    #endregion

}