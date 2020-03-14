using QuickBuy.Dominio.Entidades;
using System;
using System.Collections.Generic;
using System.Text;

namespace QuickBuy.Dominio.Contratos
{
    public interface IUsuarioRepositorio : IBaseRepositorio<Usuario>
    {
        Usuario ObterPorEmailSenha(string email, string senha);
    }
}
