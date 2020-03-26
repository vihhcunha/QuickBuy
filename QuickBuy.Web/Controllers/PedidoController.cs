using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QuickBuy.Dominio.Contratos;
using QuickBuy.Dominio.Entidades;

namespace QuickBuy.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PedidoController : ControllerBase
    {
        private readonly IPedidoRepositorio _pedidoRepositorio;

        public PedidoController(IPedidoRepositorio pedidoRepositorio)
        {
            _pedidoRepositorio = pedidoRepositorio;
        }

        [HttpPost("EfetivarCompra")]
        public IActionResult EfetivarCompra([FromBody]Pedido pedido)
        {
            try
            {
                pedido.Validate();

                if (!pedido.IsValid)
                {
                    return BadRequest(pedido.ObterMensagensValidacao());
                }
                else
                {
                    _pedidoRepositorio.Adicionar(pedido);
                }

                return Created("api/produto", pedido.Id);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}