using Microsoft.EntityFrameworkCore;
using authentication.Services;
using authentication.Models;

namespace authentication.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configuração das entidades (exemplo)
            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("tb_lcms_auth"); 
                entity.HasKey(e => e.id);
                entity.Property(e => e.username)
                    .IsRequired()
                    .HasMaxLength(50);
                entity.Property(e => e.email)
                    .IsRequired()
                    .HasMaxLength(255);
                entity.Property(e => e.password)
                    .IsRequired();
                entity.Property(e => e.createdat)
                      .HasDefaultValueSql("CURRENT_TIMESTAMP");
                entity.Property(e => e.updatedat)
                      .HasDefaultValueSql("CURRENT_TIMESTAMP");
            });
        }
    }
}
