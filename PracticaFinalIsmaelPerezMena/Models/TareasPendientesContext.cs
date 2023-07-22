using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace PracticaFinalIsmaelPerezMena.Models;

public partial class TareasPendientesContext : DbContext
{
    public TareasPendientesContext()
    {
    }

    public TareasPendientesContext(DbContextOptions<TareasPendientesContext> options)
        : base(options)
    {
    }

    public virtual DbSet<PersonaItem> PersonaItems { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=(localdb)\\MSSQLLocalDB; DataBase=TareasPendientes;Integrated Security=true");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<PersonaItem>(entity =>
        {
            entity.HasKey(e => e.IdPersonaItem);

            entity.ToTable("PersonaItem");

            entity.Property(e => e.IdPersonaItem).HasColumnName("idPersonaItem");
            entity.Property(e => e.Description)
                .HasMaxLength(100)
                .HasColumnName("description");
            entity.Property(e => e.Iscompleted)
                .HasMaxLength(2)
                .IsUnicode(false)
                .IsFixedLength()
                .HasColumnName("iscompleted");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .HasColumnName("name");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
