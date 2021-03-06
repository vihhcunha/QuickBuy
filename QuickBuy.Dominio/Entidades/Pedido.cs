﻿using QuickBuy.Dominio.ObjetoDeValor;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace QuickBuy.Dominio.Entidades
{
    public class Pedido : Entidade
    {
        public int Id { get; set; }

        public DateTime DataPedido { get; set; }

        public DateTime DataPrevisaoEntrega { get; set; }

        public string Cep { get; set; }

        public string Estado { get; set; }

        public string Cidade { get; set; }

        public string Endereco { get; set; }

        public string Numero { get; set; }

        public int UsuarioId { get; set; }

        public virtual Usuario Usuario { get; set; }

        public virtual ICollection<ItemPedido> ItensPedido { get; set; }

        public int FormaPagamentoId { get; set; }

        public virtual FormaPagamento FormaPagamento { get; set; }

        public override void Validate()
        {
            LimparMensagensDeValidacao();

            if (!ItensPedido.Any())
                AdicionarMensagem("Crítica - Pedido não pode ficar sem item de pedido");

            if (string.IsNullOrEmpty(Cep))
                AdicionarMensagem("Crítica - CEP deve estar preenchido");

            if (FormaPagamentoId == 0)
                AdicionarMensagem("Crítica - Não foi informado a forma de pagamento");

        }
    }
}
