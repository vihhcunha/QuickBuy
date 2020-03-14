using QuickBuy.Dominio.Contratos;
using QuickBuy.Dominio.Entidades;
using QuickBuy.Repositorio.Contexto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;

namespace QuickBuy.Repositorio.Repositorios
{
    public class UsuarioRepositorio : BaseRepositorio<Usuario>, IUsuarioRepositorio
    {
        public UsuarioRepositorio(QuickBuyContext quickBuyContext) : base(quickBuyContext)
        {

        }

        public Usuario ObterPorEmailSenha(string email, string senha)
        {
            return _quickBuyContext.Usuarios.FirstOrDefault(u => u.Email == email && u.Senha == senha);
        }
    }
}
