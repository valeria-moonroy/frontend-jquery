const API_USUARIOS = 'http://173.255.215.204:3001/api/usuarios';
const API_AUTORES = 'http://173.255.215.204:3002/api/autores';
const API_LIBROS = 'http://173.255.215.204:3003/api/libros';
const API_PRESTAMOS = 'http://173.255.215.204:3004/api/prestamos';
const API_DEVOLUCIONES = 'http://173.255.215.204:3004/api/devoluciones';

$(document).ready(function () {
  $('.nav-link').on('click', function () {
    $('.nav-link').removeClass('active');
    $(this).addClass('active');
  });
});

function registroUsuarios() {
  const nombre = $('#nombre').val();
  const correo = $('#email').val();
  const identificacion = $('#identificacion').val();

  if (!nombre || !correo || !identificacion) {
    alert('Completa nombre, correo e identificación');
    return;
  }

  $.ajax({
    url: API_USUARIOS,
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({
      nombre: nombre,
      correo: correo,
      identificacion: identificacion
    }),
    success: function (response) {
      alert(response.message || 'Usuario registrado correctamente');

      $('#nombre').val('');
      $('#email').val('');
      $('#identificacion').val('');
      $('#pwd').val('');
    },
    error: function (xhr) {
      const message = xhr.responseJSON?.message || 'Error al registrar usuario';
      alert(message);
      console.log(xhr.responseJSON || xhr);
    }
  });
}
function cargarUsuarios() {
  $.ajax({
    url: API_USUARIOS,
    method: 'GET',
    success: function (usuarios) {
      let filas = '';

      if (usuarios.length === 0) {
        filas = `
          <tr>
            <td colspan="4" class="text-center text-muted">
              No hay usuarios registrados
            </td>
          </tr>
        `;
      }

      usuarios.forEach(function (usuario) {
        filas += `
          <tr>
            <td>${usuario.id}</td>
            <td>${usuario.nombre}</td>
            <td>${usuario.correo}</td>
            <td>${usuario.identificacion}</td>
          </tr>
        `;
      });

      $('#tablaUsuarios').html(filas);
    },
    error: function (xhr) {
      alert('Error al cargar usuarios');
      console.log(xhr.responseJSON || xhr);
    }
  });
}
