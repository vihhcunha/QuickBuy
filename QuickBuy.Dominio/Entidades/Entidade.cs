using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace QuickBuy.Dominio.Entidades
{
    public abstract class Entidade 
    {
        private List<string> _mensagensValidacao { get; set; }
        
        public List<string> MensagemValidacao 
        { 
            get { return _mensagensValidacao ?? (_mensagensValidacao = new List<string>()); } 
        }

        protected void LimparMensagensDeValidacao()
        {
            MensagemValidacao.Clear();
        }

        protected void AdicionarMensagem(string mensagem)
        {
            MensagemValidacao.Add(mensagem);
        }

        public abstract void Validate();

        protected bool EhValido
        {
            get { return !MensagemValidacao.Any(); }
        }
    }
}
