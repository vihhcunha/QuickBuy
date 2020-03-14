using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using QuickBuy.Dominio.Entidades;
using System;
using System.Collections.Generic;
using System.Text;

namespace QuickBuy.Repositorio.Config
{
    class UsuarioConfiguration : IEntityTypeConfiguration<Usuario>
    {
        public void Configure(EntityTypeBuilder<Usuario> builder)
        {
            builder.HasKey(user => user.Id);

            //Builder utiliza o padrão Fluent
            builder.Property(user => user.Email)
                .IsRequired()
                .HasMaxLength(50);

            builder.Property(user => user.Nome)
                .IsRequired();

            builder.Property(user => user.Sobrenome)
                .IsRequired();

            builder.Property(user => user.Senha)
               .IsRequired()
               .HasMaxLength(500);

            builder.HasMany(user => user.Pedidos)
                .WithOne(p => p.Usuario);
        }
    }
}
