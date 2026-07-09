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

function cargarAutores() {
  $.ajax({
    url: API_AUTORES,
    method: 'GET',
    success: function (autores) {
      let filas = '';

      if (autores.length === 0) {
        filas = `
          <tr>
            <td colspan="2" class="text-center text-muted">
              No hay autores registrados
            </td>
          </tr>
        `;
      }

      autores.forEach(function (autor) {
        filas += `
          <tr>
            <td>${autor.id}</td>
            <td>${autor.nombre}</td>
          </tr>
        `;
      });

      $('#tablaAutores').html(filas);
    },
    error: function (xhr) {
      alert('Error al cargar autores');
      console.log(xhr.responseJSON || xhr);
    }
  });
}

function registrarAutor() {
  const nombre = $('#autorNombre').val();

  if (!nombre) {
    alert('Escribe el nombre del autor');
    return;
  }

  $.ajax({
    url: API_AUTORES,
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({
      nombre: nombre
    }),
    success: function (response) {
      alert(response.message || 'Autor registrado correctamente');

      $('#autorNombre').val('');
      cargarAutores();
    },
    error: function (xhr) {
      const message = xhr.responseJSON?.message || 'Error al registrar autor';
      alert(message);
      console.log(xhr.responseJSON || xhr);
    }
  });
}
function cargarLibros() {
  $.ajax({
    url: API_LIBROS,
    method: 'GET',
    success: function (libros) {
      let filas = '';

      if (libros.length === 0) {
        filas = `
          <tr>
            <td colspan="5" class="text-center text-muted">
              No hay libros registrados
            </td>
          </tr>
        `;
      }

      libros.forEach(function (libro) {
        filas += `
          <tr>
            <td>${libro.id}</td>
            <td>${libro.titulo}</td>
            <td>${libro.autor_id}</td>
            <td>${libro.isbn || ''}</td>
            <td>${libro.cantidad}</td>
          </tr>
        `;
      });

      $('#tablaLibros').html(filas);
    },
    error: function (xhr) {
      alert('Error al cargar libros');
      console.log(xhr.responseJSON || xhr);
    }
  });
}

function registrarLibro() {
  const titulo = $('#libroTitulo').val();
  const autorId = $('#libroAutorId').val();
  const isbn = $('#libroIsbn').val();
  const cantidad = $('#libroCantidad').val();

  if (!titulo || !autorId || !cantidad) {
    alert('Completa título, ID del autor y cantidad');
    return;
  }

  $.ajax({
    url: API_LIBROS,
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({
      titulo: titulo,
      autor_id: Number(autorId),
      isbn: isbn,
      cantidad: Number(cantidad)
    }),
    success: function (response) {
      alert(response.message || 'Libro registrado correctamente');

      $('#libroTitulo').val('');
      $('#libroAutorId').val('');
      $('#libroIsbn').val('');
      $('#libroCantidad').val('');

      cargarLibros();
    },
    error: function (xhr) {
      const message = xhr.responseJSON?.message || 'Error al registrar libro';
      alert(message);
      console.log(xhr.responseJSON || xhr);
    }
  });
}
function cargarPrestamos() {
  $.ajax({
    url: API_PRESTAMOS,
    method: 'GET',
    success: function (prestamos) {
      let filas = '';

      if (prestamos.length === 0) {
        filas = `
          <tr>
            <td colspan="6" class="text-center text-muted">
              No hay préstamos registrados
            </td>
          </tr>
        `;
      }

      prestamos.forEach(function (prestamo) {
        filas += `
          <tr>
            <td>${prestamo.id}</td>
            <td>${prestamo.usuario_id}</td>
            <td>${prestamo.libro_id}</td>
            <td>${prestamo.fecha_prestamo}</td>
            <td>${prestamo.fecha_limite}</td>
            <td>${prestamo.estado}</td>
          </tr>
        `;
      });

      $('#tablaPrestamos').html(filas);
    },
    error: function (xhr) {
      alert('Error al cargar préstamos');
      console.log(xhr.responseJSON || xhr);
    }
  });
}

function registrarPrestamo() {
  const usuarioId = $('#prestamoUsuarioId').val();
  const libroId = $('#prestamoLibroId').val();
  const fechaLimite = $('#prestamoFechaLimite').val();

  if (!usuarioId || !libroId || !fechaLimite) {
    alert('Completa ID usuario, ID libro y fecha límite');
    return;
  }

  $.ajax({
    url: API_PRESTAMOS,
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({
      usuario_id: Number(usuarioId),
      libro_id: Number(libroId),
      fecha_limite: fechaLimite
    }),
    success: function (response) {
      alert(response.message || 'Préstamo registrado correctamente');

      $('#prestamoUsuarioId').val('');
      $('#prestamoLibroId').val('');
      $('#prestamoFechaLimite').val('');

      cargarPrestamos();
    },
    error: function (xhr) {
      const message = xhr.responseJSON?.message || 'Error al registrar préstamo';
      alert(message);
      console.log(xhr.responseJSON || xhr);
    }
  });
}
function cargarDevoluciones() {
  $.ajax({
    url: API_DEVOLUCIONES,
    method: 'GET',
    success: function (devoluciones) {
      let filas = '';

      if (devoluciones.length === 0) {
        filas = `
          <tr>
            <td colspan="4" class="text-center text-muted">
              No hay devoluciones registradas
            </td>
          </tr>
        `;
      }

      devoluciones.forEach(function (devolucion) {
        filas += `
          <tr>
            <td>${devolucion.id}</td>
            <td>${devolucion.prestamo_id}</td>
            <td>${devolucion.fecha_devolucion}</td>
            <td>${devolucion.observaciones || ''}</td>
          </tr>
        `;
      });

      $('#tablaDevoluciones').html(filas);
    },
    error: function (xhr) {
      alert('Error al cargar devoluciones');
      console.log(xhr.responseJSON || xhr);
    }
  });
}

function registrarDevolucion() {
  const prestamoId = $('#devolucionPrestamoId').val();
  const observaciones = $('#devolucionObservaciones').val();

  if (!prestamoId) {
    alert('Escribe el ID del préstamo');
    return;
  }

  $.ajax({
    url: API_DEVOLUCIONES,
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({
      prestamo_id: Number(prestamoId),
      observaciones: observaciones
    }),
    success: function (response) {
      alert(response.message || 'Devolución registrada correctamente');

      $('#devolucionPrestamoId').val('');
      $('#devolucionObservaciones').val('');

      cargarDevoluciones();
      cargarPrestamos();
    },
    error: function (xhr) {
      const message = xhr.responseJSON?.message || 'Error al registrar devolución';
      alert(message);
      console.log(xhr.responseJSON || xhr);
    }
  });
}
function login() {
  const email = $('#email').val();
  const pwd = $('#pwd').val();

  if (!email || !pwd) {
    alert('Escribe tu email y contraseña');
    return;
  }

  localStorage.setItem('usuario_logueado', email);

  window.location.href = 'dashboard.html';
}
