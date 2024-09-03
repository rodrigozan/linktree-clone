using Microsoft.EntityFrameworkCore;
using authentication.Services;
using authentication.Models;

namespace authentication.Data
{
    public class ApplicationDbContext : DbContext
    {
        private readonly PasswordHasher _passwordHasher;
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options, PasswordHasher passwordHasher)
            : base(options)
        {
            _passwordHasher = passwordHasher;
        }

        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configuração das entidades (exemplo)
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Name)
                      .IsRequired()
                      .HasMaxLength(100);
                entity.Property(e => e.Username)
                    .IsRequired()
                    .HasMaxLength(50);
                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(255);
                entity.Property(e => e.Password)
                    .IsRequired();
                entity.Property(e => e.CreatedDate)
                      .HasDefaultValueSql("CURRENT_TIMESTAMP");
            });
        }
    }
}
