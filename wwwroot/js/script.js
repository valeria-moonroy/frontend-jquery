const API_USUARIOS = 'http://173.255.215.204:3001/api/usuarios';
const API_AUTORES = 'http://173.255.215.204:3002/api/autores';
const API_LIBROS = 'http://173.255.215.204:3003/api/libros';
const API_PRESTAMOS = 'http://173.255.215.204:3004/api/prestamos';
const API_DEVOLUCIONES = 'http://173.255.215.204:3004/api/devoluciones';

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

function registroUsuarios() {
  const nombre = $('#nombre').val();
  const correo = $('#correo').val();
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
      nombre,
      correo,
      identificacion,
    }),
    success: function (response) {
      alert(response.message || 'Usuario registrado correctamente');
      window.location.href = 'index.html';
    },
    error: function (error) {
      alert(error.responseJSON?.message || 'Error al registrar usuario');
      console.error(error);
    },
  });
}

function cargarUsuarios() {
  $.ajax({
    url: API_USUARIOS,
    method: 'GET',
    success: function (usuarios) {
      let html = '';

      if (!usuarios || usuarios.length === 0) {
        html = '<tr><td colspan="4">No hay usuarios registrados</td></tr>';
      } else {
        usuarios.forEach(function (usuario) {
          html += `
            <tr>
              <td>${usuario.id}</td>
              <td>${usuario.nombre}</td>
              <td>${usuario.correo}</td>
              <td>${usuario.identificacion}</td>
            </tr>
          `;
        });
      }

      $('#tabla_usuarios').html(html);
    },
    error: function (error) {
      alert('Error al cargar usuarios');
      console.error(error);
    },
  });
}

function registrarUsuario() {
  const nombre = $('#usuario_nombre').val();
  const correo = $('#usuario_correo').val();
  const identificacion = $('#usuario_identificacion').val();

  if (!nombre || !correo || !identificacion) {
    alert('Completa nombre, correo e identificación');
    return;
  }

  $.ajax({
    url: API_USUARIOS,
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({
      nombre,
      correo,
      identificacion,
    }),
    success: function (response) {
      alert(response.message || 'Usuario registrado correctamente');

      $('#usuario_nombre').val('');
      $('#usuario_correo').val('');
      $('#usuario_identificacion').val('');

      cargarUsuarios();
    },
    error: function (error) {
      alert(error.responseJSON?.message || 'Error al registrar usuario');
      console.error(error);
    },
  });
}

function cargarAutores() {
  $.ajax({
    url: API_AUTORES,
    method: 'GET',
    success: function (autores) {
      let html = '';

      if (!autores || autores.length === 0) {
        html = '<tr><td colspan="2">No hay autores registrados</td></tr>';
      } else {
        autores.forEach(function (autor) {
          html += `
            <tr>
              <td>${autor.id}</td>
              <td>${autor.nombre}</td>
            </tr>
          `;
        });
      }

      $('#tabla_autores').html(html);
    },
    error: function (error) {
      alert('Error al cargar autores');
      console.error(error);
    },
  });
}

function registrarAutor() {
  const nombre = $('#autor_nombre').val();

  if (!nombre) {
    alert('Escribe el nombre del autor');
    return;
  }

  $.ajax({
    url: API_AUTORES,
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({
      nombre,
    }),
    success: function (response) {
      alert(response.message || 'Autor registrado correctamente');

      $('#autor_nombre').val('');

      cargarAutores();
    },
    error: function (error) {
      alert(error.responseJSON?.message || 'Error al registrar autor');
      console.error(error);
    },
  });
}

function cargarLibros() {
  $.ajax({
    url: API_LIBROS,
    method: 'GET',
    success: function (libros) {
      let html = '';

      if (!libros || libros.length === 0) {
        html = '<tr><td colspan="5">No hay libros registrados</td></tr>';
      } else {
        libros.forEach(function (libro) {
          html += `
            <tr>
              <td>${libro.id}</td>
              <td>${libro.titulo}</td>
              <td>${libro.autor_id}</td>
              <td>${libro.isbn || ''}</td>
              <td>${libro.cantidad ?? libro.cantidad_total ?? ''}</td>
            </tr>
          `;
        });
      }

      $('#tabla_libros').html(html);
    },
    error: function (error) {
      alert('Error al cargar libros');
      console.error(error);
    },
  });
}

function registrarLibro() {
  const titulo = $('#libro_titulo').val();
  const autor_id = $('#libro_autor_id').val();
  const isbn = $('#libro_isbn').val();
  const cantidad = $('#libro_cantidad').val();

  if (!titulo || !autor_id || !cantidad) {
    alert('Completa título, ID autor y cantidad');
    return;
  }

  $.ajax({
    url: API_LIBROS,
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({
      titulo,
      autor_id: Number(autor_id),
      isbn,
      cantidad: Number(cantidad),
    }),
    success: function (response) {
      alert(response.message || 'Libro registrado correctamente');

      $('#libro_titulo').val('');
      $('#libro_autor_id').val('');
      $('#libro_isbn').val('');
      $('#libro_cantidad').val('');

      cargarLibros();
    },
    error: function (error) {
      alert(error.responseJSON?.message || 'Error al registrar libro');
      console.error(error);
    },
  });
}

function cargarPrestamos() {
  $.ajax({
    url: API_PRESTAMOS,
    method: 'GET',
    success: function (prestamos) {
      let html = '';

      if (!prestamos || prestamos.length === 0) {
        html = '<tr><td colspan="6">No hay préstamos registrados</td></tr>';
      } else {
        prestamos.forEach(function (prestamo) {
          const estado = prestamo.estado || '';

          html += `
            <tr>
              <td>${prestamo.id}</td>
              <td>${prestamo.usuario_id}</td>
              <td>${prestamo.libro_id}</td>
              <td>${prestamo.fecha_prestamo}</td>
              <td>${prestamo.fecha_limite}</td>
              <td>
                <span class="status ${estado.toLowerCase()}">
                  ${estado}
                </span>
              </td>
            </tr>
          `;
        });
      }

      $('#tabla_prestamos').html(html);
    },
    error: function (error) {
      alert('Error al cargar préstamos');
      console.error(error);
    },
  });
}

function registrarPrestamo() {
  const usuario_id = $('#prestamo_usuario_id').val();
  const libro_id = $('#prestamo_libro_id').val();
  const fecha_limite = $('#prestamo_fecha_limite').val();

  if (!usuario_id || !libro_id || !fecha_limite) {
    alert('Completa ID usuario, ID libro y fecha límite');
    return;
  }

  $.ajax({
    url: API_PRESTAMOS,
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({
      usuario_id: Number(usuario_id),
      libro_id: Number(libro_id),
      fecha_limite,
    }),
    success: function (response) {
      alert(response.message || 'Préstamo registrado correctamente');

      $('#prestamo_usuario_id').val('');
      $('#prestamo_libro_id').val('');
      $('#prestamo_fecha_limite').val('');

      cargarPrestamos();
    },
    error: function (error) {
      alert(error.responseJSON?.message || 'Error al registrar préstamo');
      console.error(error);
    },
  });
}

function cargarDevoluciones() {
  $.ajax({
    url: API_DEVOLUCIONES,
    method: 'GET',
    success: function (devoluciones) {
      let html = '';

      if (!devoluciones || devoluciones.length === 0) {
        html = '<tr><td colspan="4">No hay devoluciones registradas</td></tr>';
      } else {
        devoluciones.forEach(function (devolucion) {
          html += `
            <tr>
              <td>${devolucion.id}</td>
              <td>${devolucion.prestamo_id}</td>
              <td>${devolucion.fecha_devolucion}</td>
              <td>${devolucion.observaciones || ''}</td>
            </tr>
          `;
        });
      }

      $('#tabla_devoluciones').html(html);
    },
    error: function (error) {
      alert('Error al cargar devoluciones');
      console.error(error);
    },
  });
}

function registrarDevolucion() {
  const prestamo_id = $('#devolucion_prestamo_id').val();
  const observaciones = $('#devolucion_observaciones').val();

  if (!prestamo_id) {
    alert('Escribe el ID del préstamo');
    return;
  }

  $.ajax({
    url: API_DEVOLUCIONES,
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({
      prestamo_id: Number(prestamo_id),
      observaciones,
    }),
    success: function (response) {
      alert(response.message || 'Devolución registrada correctamente');

      $('#devolucion_prestamo_id').val('');
      $('#devolucion_observaciones').val('');

      cargarDevoluciones();
      cargarPrestamos();
    },
    error: function (error) {
      alert(error.responseJSON?.message || 'Error al registrar devolución');
      console.error(error);
    },
  });
}
