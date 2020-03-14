using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using QuickBuy.Dominio.Entidades;
using System;
using System.Collections.Generic;
using System.Text;

namespace QuickBuy.Repositorio.Config
{
    public class ProdutoConfiguration : IEntityTypeConfiguration<Produto>
    {
        public void Configure(EntityTypeBuilder<Produto> builder)
        {
            builder.HasKey(prod => prod.Id);

            builder.Property(prod => prod.Nome)
                .IsRequired();

            builder.Property(prod => prod.Preco)
                .IsRequired();

            builder.Property(prod => prod.Descricao)
                .IsRequired()
                .HasMaxLength(700);

        }
    }
}
