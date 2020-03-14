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
    public class UsuarioController : Controller
    {
        private readonly IUsuarioRepositorio _usuarioRepositorio;

        public UsuarioController(IUsuarioRepositorio usuarioRepositorio)
        {
            _usuarioRepositorio = usuarioRepositorio;
        }

        [HttpPost]
        public IActionResult Post()
        {
            try
            {
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString()); 
            }
        }

        [HttpPost("VerificarUsuario")]
        public IActionResult VerificarUsuario([FromBody] Usuario usuario)
        {
            try
            {
                var usuarioRetorno = _usuarioRepositorio.ObterPorEmailSenha(usuario.Email, usuario.Senha);

                if(usuarioRetorno != null)
                {
                    return Ok(usuarioRetorno);
                }

                return BadRequest("Usuário ou senha inválidos!");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }
        }
    }
}