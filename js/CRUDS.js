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
  
  // Función para agregar y guardar un curso
  function guardarCurso() {
    const nombre = document.getElementById('curso-nombre').value;
    const descripcion = document.getElementById('curso-descripcion').value;
    const video = document.getElementById('curso-video').files[0];
    const documento = document.getElementById('curso-documento').files[0];
  
    if (nombre && descripcion) {
      // Agregar fila a la tabla con los detalles del curso
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
  
      // Limpiar los campos del formulario después de guardar
      document.getElementById('curso-nombre').value = '';
      document.getElementById('curso-descripcion').value = '';
      document.getElementById('curso-video').value = '';
      document.getElementById('curso-documento').value = '';
    } else {
      alert('Por favor completa todos los campos obligatorios.');
    }
  }
  async function cargarAlumnos() {
    try {
        const response = await fetch('/api/alumnos');
        if (!response.ok) throw new Error('Error al cargar alumnos');
        
        const alumnos = await response.json();
        const alumnosTableBody = document.getElementById('alumnos-table').getElementsByTagName('tbody')[0];
        alumnosTableBody.innerHTML = ''; // Limpiar la tabla antes de cargar

        alumnos.forEach(alumno => {
            const row = alumnosTableBody.insertRow();
            row.innerHTML = `
                <td>${alumno.nombre} ${alumno.apellidos}</td>
                <td>${alumno.fecha_nacimiento}</td>
                <td>${alumno.correo}</td>
                <td>Becado</td> <!-- Ejemplo de Plan -->
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

// Llamar a cargarProfesores cuando la pestaña se selecciona
document.getElementById('profesor-tab').addEventListener('click', cargarProfesores);

// Llamar a cargarAlumnos cuando la página se cargue
document.addEventListener('DOMContentLoaded', cargarAlumnos);

  // ------------- Funciones comunes (Eliminar y Guardar Fila) -------------
  
  // Función para eliminar una fila de la tabla
  function deleteRow(btn) {
    const row = btn.parentNode.parentNode;
    row.parentNode.removeChild(row);
  }
  
  // Función para guardar una fila (activar/desactivar edición)
  function saveRow(btn) {
    const row = btn.parentNode.parentNode;
    const inputs = row.getElementsByTagName('input');
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].disabled = !inputs[i].disabled; // Alterna el estado de habilitación
    }
  }
  document.addEventListener('DOMContentLoaded', cargarAlumnos);
