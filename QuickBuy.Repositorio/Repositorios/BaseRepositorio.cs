using QuickBuy.Dominio.Contratos;
using QuickBuy.Repositorio.Contexto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace QuickBuy.Repositorio.Repositorios
{
    public class BaseRepositorio<T> : IBaseRepositorio<T> where T : class
    {
        protected readonly QuickBuyContext _quickBuyContext;

        public BaseRepositorio(QuickBuyContext quickBuyContext)
        {
            _quickBuyContext = quickBuyContext;
        }

        public void Adicionar(T entity)
        {
            _quickBuyContext.Set<T>().Add(entity);
            _quickBuyContext.SaveChanges();
        }

        public void Atualizar(T entity)
        {
            _quickBuyContext.Set<T>().Update(entity);
            _quickBuyContext.SaveChanges();
        }

        public T ObterPorId(int Id)
        {
            return _quickBuyContext.Set<T>().Find(Id);
        }

        public IEnumerable<T> ObterTodos()
        {
            return _quickBuyContext.Set<T>().ToList();
        }

        public void Remover(T entity)
        {
            _quickBuyContext.Remove(entity);
            _quickBuyContext.SaveChanges();
        }

        public void Dispose()
        {
            _quickBuyContext.Dispose();
        }
    }
}
