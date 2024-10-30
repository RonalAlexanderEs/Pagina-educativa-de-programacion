// Mostrar secciones según pestaña seleccionada
document.getElementById('alumnos-tab').addEventListener('click', function() {
  showTab('alumnos-content');
});

document.getElementById('profesor-tab').addEventListener('click', function() {
  showTab('profesor-content');
});

document.getElementById('cursos-tab').addEventListener('click', function() {
  showTab('cursos-content');
});

document.getElementById('becas-tab').addEventListener('click', function() {
  showTab('becas-content');
  cargarSolicitudesBecas(); // Cargar solicitudes de becas al seleccionar la pestaña
});

function showTab(tabId) {
  // Ocultar todas las secciones primero
  document.querySelectorAll('.content-tab').forEach(function(tab) {
    tab.style.display = 'none';
  });

  // Mostrar la sección correspondiente
  document.getElementById(tabId).style.display = 'block';
}

// ------------- Funciones CRUD para Alumnos -------------
function addAlumno() {
  const table = document.getElementById('alumnos-table').getElementsByTagName('tbody')[0];
  const newRow = table.insertRow();
  newRow.innerHTML = `
    <td><input type="text" placeholder="Usuario"></td>
    <td><input type="number" placeholder="Edad"></td>
    <td><input type="email" placeholder="Correo"></td>
    <td>
      <select>
        <option value="Familiar">Familiar</option>
        <option value="Personal">Personal</option>
        <option value="Becado">Becado</option>
        <option value="Dúo">Dúo</option>
      </select>
    </td>
    <td>
      <button class="btn btn-edit" onclick="saveRow(this)"><i class="material-icons">edit</i></button>
      <button class="btn btn-delete" onclick="deleteRow(this)"><i class="material-icons">delete</i></button>
    </td>
  `;
}

// ------------- Funciones CRUD para Profesor -------------
function addProfesor() {
  const table = document.getElementById('profesor-table').getElementsByTagName('tbody')[0];
  const newRow = table.insertRow();
  newRow.innerHTML = `
    <td><input type="text" placeholder="Usuario"></td>
    <td><input type="number" placeholder="Edad"></td>
    <td><input type="email" placeholder="Correo"></td>
    <td>
      <button class="btn btn-edit" onclick="saveRow(this)"><i class="material-icons">edit</i></button>
      <button class="btn btn-delete" onclick="deleteRow(this)"><i class="material-icons">delete</i></button>
    </td>
  `;
}

// ------------- Funciones CRUD para Cursos -------------
function guardarCurso() {
  const nombre = document.getElementById('curso-nombre').value;
  const descripcion = document.getElementById('curso-descripcion').value;
  const video = document.getElementById('curso-video').files[0];
  const documento = document.getElementById('curso-documento').files[0];

  if (nombre && descripcion) {
    const table = document.getElementById('cursos-table').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();
    newRow.innerHTML = `
      <td>${nombre}</td>
      <td>${descripcion}</td>
      <td>${video ? video.name : 'No hay video'}</td>
      <td>${documento ? documento.name : 'No hay documento'}</td>
      <td>
        <button class="btn btn-delete" onclick="deleteRow(this)"><i class="material-icons">delete</i></button>
      </td>
    `;

    document.getElementById('curso-nombre').value = '';
    document.getElementById('curso-descripcion').value = '';
    document.getElementById('curso-video').value = '';
    document.getElementById('curso-documento').value = '';
  } else {
    alert('Por favor completa todos los campos obligatorios.');
  }
}

// Función para cargar los alumnos
async function cargarAlumnos() {
  try {
    const response = await fetch('/api/alumnos');
    if (!response.ok) throw new Error('Error al cargar alumnos');
    
    const alumnos = await response.json();
    const alumnosTableBody = document.getElementById('alumnos-table').getElementsByTagName('tbody')[0];
    alumnosTableBody.innerHTML = '';

    alumnos.forEach(alumno => {
      const row = alumnosTableBody.insertRow();
      row.innerHTML = `
        <td>${alumno.nombre} ${alumno.apellidos}</td>
        <td>${alumno.fecha_nacimiento}</td>
        <td>${alumno.correo}</td>
        <td>Becado</td>
        <td>
          <button class="btn btn-edit" onclick="editAlumno(this)"><i class="material-icons">edit</i></button>
          <button class="btn btn-delete" onclick="deleteAlumno(this)"><i class="material-icons">delete</i></button>
        </td>
      `;
    });
  } catch (error) {
    console.error(error);
    alert('No se pudieron cargar los datos de los alumnos');
  }
}

// Función para cargar los profesores
async function cargarProfesores() {
  try {
    const response = await fetch('/api/profesores');
    if (!response.ok) throw new Error('Error al cargar profesores');
    
    const profesores = await response.json();
    const profesorTableBody = document.getElementById('profesor-table').getElementsByTagName('tbody')[0];

    profesorTableBody.innerHTML = '';
    profesores.forEach(profesor => {
      const row = profesorTableBody.insertRow();
      row.innerHTML = `
        <td>${profesor.nombre}</td>
        <td>${profesor.correo}</td>
        <td>
          <button class="btn btn-edit" onclick="editProfessor(this)">Editar</button>
          <button class="btn btn-delete" onclick="deleteProfessor(this)">Eliminar</button>
        </td>
      `;
    });
  } catch (error) {
    console.error(error);
    alert('No se pudieron cargar los datos de los profesores');
  }
}

// Función para cargar las solicitudes de becas
async function cargarSolicitudesBecas() {
  try {
    const response = await fetch('/api/becas');
    if (!response.ok) throw new Error('Error al cargar solicitudes de becas');

    const solicitudes = await response.json();
    const becasTableBody = document.getElementById('becas-table').getElementsByTagName('tbody')[0];
    becasTableBody.innerHTML = '';

    solicitudes.forEach(solicitud => {
      const row = becasTableBody.insertRow();
      row.innerHTML = `
        <td>${solicitud.nombre}</td>
        <td>${solicitud.area_beca}</td>
        <td>
          <a href="${solicitud.carta_solicitud}">Carta de Solicitud</a>, 
          <a href="${solicitud.comprobante}">Comprobante</a>
        </td>
        <td>
          <select onchange="cambiarEstado(this)">
            <option value="aprobado">Aprobado</option>
            <option value="en_revision" selected>En revisión</option>
            <option value="rechazado">Rechazado</option>
          </select>
        </td>
        <td>
          <button class="btn btn-delete" onclick="deleteSolicitud(${solicitud.id})"><i class="material-icons">delete</i></button>
          <button class="btn btn-view" onclick="viewDetails(${solicitud.id})"><i class="material-icons">info</i></button>
        </td>
      `;
      row.dataset.id = solicitud.id; // Agregar data-id para referencia
    });
  } catch (error) {
    console.error(error);
    alert('No se pudieron cargar los datos de las solicitudes de becas');
  }
}

function viewDetails(solicitudId) {
  // Lógica para obtener los detalles de la solicitud
  fetch(`/api/becas/${solicitudId}`)
    .then(response => {
      // Verifica el estado de la respuesta
      if (!response.ok) {
        throw new Error('Error en la respuesta del servidor');
      }
      return response.text(); // Cambiamos a text() para ver la respuesta
    })
    .then(data => {
      console.log(data); // Muestra la respuesta en la consola
      const jsonData = JSON.parse(data); // Intenta parsear a JSON
      const modalDetails = document.getElementById('modal-details');
      modalDetails.innerHTML = `
        <p>Nombre: ${jsonData.nombre}</p>
        <p>Área de Beca: ${jsonData.area_beca}</p>
        <p>Carta de Solicitud: <a href="${jsonData.carta_solicitud}">Ver</a></p>
        <p>Comprobante: <a href="${jsonData.comprobante}">Ver</a></p>
        <p>Estado: ${jsonData.estado}</p>
      `;

      // Mostrar el modal
      const modal = document.getElementById('modal');
      modal.style.display = 'block';
    })
    .catch(error => {
      console.error('Error al cargar los detalles:', error);
      alert('Error al cargar los detalles de la solicitud. Verifica la consola para más información.');
    });
}



async function cambiarEstado(selectElement) {
  const estado = selectElement.value;
  const row = selectElement.closest('tr');
  const solicitudId = row.dataset.id;

  try {
    await fetch(`/api/becas/${solicitudId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ estado })
    });
    console.log('Estado actualizado');
  } catch (error) {
    console.error('Error al actualizar el estado:', error);
  }
}

async function deleteSolicitud(solicitudId) {
  try {
    await fetch(`/api/becas/${solicitudId}`, { // Endpoint para eliminar la solicitud
      method: 'DELETE'
    });
    console.log('Solicitud eliminada');
    cargarSolicitudesBecas(); // Recargar las solicitudes
  } catch (error) {
    console.error('Error al eliminar la solicitud:', error);
  }
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
  cargarAlumnos();
  cargarProfesores();
  cargarSolicitudesBecas();
});
// Cerrar el modal al hacer clic en la 'X'
document.querySelector('.close').addEventListener('click', function() {
  const modal = document.getElementById('modal');
  modal.style.display = 'none';
});

// Cerrar el modal al hacer clic fuera del contenido
window.addEventListener('click', function(event) {
  const modal = document.getElementById('modal');
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});
async function obtenerInformacionEstudiante(id) {
  try {
      const response = await fetch(`/api/beca/${id}`);
      if (!response.ok) {
          throw new Error('Error al cargar los detalles del estudiante');
      }
      const estudiante = await response.json();
      return estudiante; // Devuelve los datos del estudiante
  } catch (error) {
      console.error('Error al cargar los detalles:', error);
      alert('Error al cargar la información del estudiante.');
  }
}
async function descargarInformacionEstudiante(id) {
  const estudiante = await obtenerInformacionEstudiante(id);
  if (estudiante) {
      // Llama a la función de descarga que elijas aquí
      // Por ejemplo, para descargar como TXT:
      const contenido = `
      Nombre: ${estudiante.nombre}
      DNI: ${estudiante.dni}
      Fecha de Nacimiento: ${estudiante.fecha_nacimiento}
      Email: ${estudiante.email}
      Teléfono: ${estudiante.telefono}
      Sexo: ${estudiante.sexo}
      País: ${estudiante.pais}
      Departamento: ${estudiante.departamento}
      Distrito: ${estudiante.distrito}
      Dirección: ${estudiante.direccion}
      Código Postal: ${estudiante.codigo_postal}
      Referencia: ${estudiante.referencia}
      Código Estudiante: ${estudiante.codigo_estudiante}
      Nivel Educativo: ${estudiante.nivel_educativo}
      Área de Beca: ${estudiante.area_beca}
      Tipo de Beca: ${estudiante.tipo_beca}
      Carta de Solicitud: ${estudiante.carta_solicitud}
      Comprobante: ${estudiante.comprobante}
      `;

      const blob = new Blob([contenido], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'informacion_estudiante.txt';
      a.click();
      URL.revokeObjectURL(url);
  }
}
