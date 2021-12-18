using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace Amadeus
{
    public partial class AmadeusContext : DbContext
    {
        public AmadeusContext()
        {
        }

        public AmadeusContext(DbContextOptions<AmadeusContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Call> Calls { get; set; }
        public virtual DbSet<News> News { get; set; }
        public virtual DbSet<Role> Roles { get; set; }
        public virtual DbSet<Shedule> Shedules { get; set; }
        public virtual DbSet<Template> Templates { get; set; }
        public virtual DbSet<Traner> Traners { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<UsersInformation> UsersInformations { get; set; }
        public virtual DbSet<training> training { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Server=WIN-4PG4224I26S;Database=Amadeus;Trusted_Connection=True;");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "Cyrillic_General_CI_AS");

            modelBuilder.Entity<Call>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.Id).ValueGeneratedOnAdd();

                entity.Property(e => e.Name).HasMaxLength(30);

                entity.Property(e => e.Phone).HasMaxLength(15);

                entity.Property(e => e.Surname).HasMaxLength(30);
            });

            modelBuilder.Entity<News>(entity =>
            {
                entity.Property(e => e.NewsElement)
                    .HasColumnType("text")
                    .HasColumnName("News_element");

                entity.Property(e => e.NewsHeading)
                    .HasMaxLength(350)
                    .HasColumnName("News_heading");
            });

            modelBuilder.Entity<Role>(entity =>
            {
                entity.Property(e => e.RoleName)
                    .HasMaxLength(20)
                    .HasColumnName("Role_name");
            });

            modelBuilder.Entity<Shedule>(entity =>
            {
                entity.ToTable("Shedule");

                entity.Property(e => e.Data).HasColumnType("date");

                entity.Property(e => e.HoursEnd).HasColumnName("Hours_end");

                entity.Property(e => e.HoursStart).HasColumnName("Hours_start");

                entity.Property(e => e.IdTrainer).HasColumnName("Id_trainer");

                entity.Property(e => e.TemplateTraining)
                    .HasMaxLength(50)
                    .HasColumnName("Template_training");

                entity.HasOne(d => d.IdTrainerNavigation)
                    .WithMany(p => p.Shedules)
                    .HasForeignKey(d => d.IdTrainer)
                    .HasConstraintName("FK__Shedule__Id_trai__73BA3083");

                entity.HasOne(d => d.TemplateTrainingNavigation)
                    .WithMany(p => p.Shedules)
                    .HasForeignKey(d => d.TemplateTraining)
                    .HasConstraintName("FK__Shedule__Templat__74AE54BC");
            });

            modelBuilder.Entity<Template>(entity =>
            {
                entity.HasKey(e => e.TemplateName)
                    .HasName("PK__Template__6FA87A995E806727");

                entity.ToTable("Template");

                entity.Property(e => e.TemplateName)
                    .HasMaxLength(50)
                    .HasColumnName("Template_name");
            });

            modelBuilder.Entity<Traner>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Name).HasMaxLength(20);

                entity.Property(e => e.Surname).HasMaxLength(20);
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.Property(e => e.IdRole).HasColumnName("Id_role");

                entity.Property(e => e.Login).HasMaxLength(20);

                entity.Property(e => e.Name).HasMaxLength(20);

                entity.Property(e => e.Password).HasMaxLength(200);

                entity.Property(e => e.Phone).HasMaxLength(15);

                entity.Property(e => e.Surname).HasMaxLength(20);

                entity.HasOne(d => d.IdRoleNavigation)
                    .WithMany(p => p.Users)
                    .HasForeignKey(d => d.IdRole)
                    .HasConstraintName("FK__Users__Id_role__6C190EBB");
            });

            modelBuilder.Entity<UsersInformation>(entity =>
            {
                entity.HasKey(e => e.IdUser)
                    .HasName("PK__Users_in__B607F24869793679");

                entity.ToTable("Users_information");

                entity.Property(e => e.IdUser)
                    .ValueGeneratedNever()
                    .HasColumnName("Id_user");

                entity.Property(e => e.AmountTraining).HasColumnName("Amount_training");

                entity.Property(e => e.CanceledTraining).HasColumnName("Canceled_training");

                entity.Property(e => e.LevelStatus)
                    .HasMaxLength(20)
                    .HasColumnName("Level_status");

                entity.Property(e => e.SubscriptionTraining).HasColumnName("Subscription_training");

                entity.Property(e => e.TrainerDiscription)
                    .HasColumnType("text")
                    .HasColumnName("Trainer_discription");

                entity.Property(e => e.WasOnTraining)
                    .HasMaxLength(1)
                    .HasColumnName("Was_on_training")
                    .IsFixedLength(true);

                entity.HasOne(d => d.IdUserNavigation)
                    .WithOne(p => p.UsersInformation)
                    .HasForeignKey<UsersInformation>(d => d.IdUser)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Users_inf__Id_us__6EF57B66");
            });

            modelBuilder.Entity<training>(entity =>
            {
                entity.ToTable("Training");

                entity.Property(e => e.IdShedule).HasColumnName("Id_shedule");

                entity.Property(e => e.IdUser).HasColumnName("Id_user");

                entity.Property(e => e.Status).HasMaxLength(20);

                entity.HasOne(d => d.IdSheduleNavigation)
                    .WithMany(p => p.training)
                    .HasForeignKey(d => d.IdShedule)
                    .HasConstraintName("FK__Training__Id_she__778AC167");

                entity.HasOne(d => d.IdUserNavigation)
                    .WithMany(p => p.training)
                    .HasForeignKey(d => d.IdUser)
                    .HasConstraintName("FK__Training__Id_use__787EE5A0");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
