using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PracticaFinalIsmaelPerezMena.Models;

namespace PracticaFinalIsmaelPerezMena.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonaItemController : ControllerBase
    {
        /**
         * /**
         * Objeto que representa la conexión con la Base de Datos.
         */
        private readonly TareasPendientesContext _dbcontext;

        public PersonaItemController(TareasPendientesContext context)
        {
            _dbcontext = context;
        }

        /**
         * Método que obtiene toda a lista de Tareas almacenada en la base de datos.
         */
        [HttpGet]
        [Route("Lista")]
        public async Task<IActionResult> Lista()
        {
            List<PersonaItem> lista = await _dbcontext.PersonaItems.OrderByDescending(c => c.IdPersonaItem).ToListAsync();

            return StatusCode(StatusCodes.Status200OK, lista);
        }

        /**
         * Método que permite guardar una nueva tarea en la base de datos.
         */
        [HttpPost]
        [Route("Guardar")]
        public async Task<IActionResult> Guardar([FromBody] PersonaItem request)
        {
            await _dbcontext.PersonaItems.AddAsync(request);
            await _dbcontext.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "ok");
        }

        /**
         * Método que permite editar/modificar una tarea existente en la base de datos.
         */
        [HttpPut]
        [Route("Editar")]
        public async Task<IActionResult> Editar([FromBody] PersonaItem request)
        {
            _dbcontext.PersonaItems.Update(request);
            await _dbcontext.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "ok");
        }

        /**
         * Método que permite eliminar un contacto en la base de datos.
         */
        [HttpDelete]
        [Route("Eliminar/{id:int}")]
        public async Task<IActionResult> Eliminar(int id)
        {
            PersonaItem personaItem = _dbcontext.PersonaItems.Find(id);

            _dbcontext.PersonaItems.Remove(personaItem);
            await _dbcontext.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "ok");
        }
    }
}
