// Mostrar secciones según pestaña seleccionada
document.getElementById('alumnos-tab').addEventListener('click', function() {
    showTab('alumnos-content');
  });
  
  document.getElementById('profesor-tab').addEventListener('click', function() {
    showTab('profesor-content');
  });
  
  document.getElementById('cursos-tab').addEventListener('click', function() {
    showTab('dashboard-content');
  });
  
  function showTab(tabId) {
    document.querySelectorAll('.content-tab').forEach(function(tab) {
      tab.style.display = 'none';
    });
    document.getElementById(tabId).style.display = 'block';
  }
  
  // Funciones CRUD para Alumnos
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
        <button onclick="saveRow(this)"><i class="material-icons">edit</i></button>
        <button onclick="deleteRow(this)"><i class="material-icons">delete</i></button>
      </td>
    `;
    updateStats();
  }
  
  // Funciones CRUD para Profesor
  function addProfesor() {
    const table = document.getElementById('profesor-table').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();
    newRow.innerHTML = `
      <td><input type="text" placeholder="Usuario"></td>
      <td><input type="number" placeholder="Edad"></td>
      <td><input type="email" placeholder="Correo"></td>
      <td>
        <button onclick="saveRow(this)"><i class="material-icons">edit</i></button>
        <button onclick="deleteRow(this)"><i class="material-icons">delete</i></button>
      </td>
    `;
    updateStats();
  }
  
  // Guardar los datos de la fila
  function saveRow(button) {
    const row = button.closest('tr');
    const inputs = row.getElementsByTagName('input');
    const select = row.getElementsByTagName('select')[0];
  
    for (let i = 0; i < inputs.length; i++) {
      const value = inputs[i].value;
      const cell = inputs[i].parentElement;
      cell.innerHTML = value;
    }
  
    // Reemplazar el select con el valor seleccionado
    if (select) {
      const selectedValue = select.value;
      select.parentElement.innerHTML = selectedValue;
    }
  
    button.innerHTML = '<i class="material-icons">edit</i>';
    button.setAttribute('onclick', 'editRow(this)');
  }
  
  // Editar una fila
  function editRow(button) {
    const row = button.closest('tr');
    const cells = row.getElementsByTagName('td');
    for (let i = 0; i < cells.length - 1; i++) {
      const value = cells[i].textContent;
  
      // Si es la columna del plan, poner un select con las opciones
      if (i === 3) {
        cells[i].innerHTML = `
          <select>
            <option value="Familiar" ${value === 'Familiar' ? 'selected' : ''}>Familiar</option>
            <option value="Personal" ${value === 'Personal' ? 'selected' : ''}>Personal</option>
            <option value="Becado" ${value === 'Becado' ? 'selected' : ''}>Becado</option>
            <option value="Dúo" ${value === 'Dúo' ? 'selected' : ''}>Dúo</option>
          </select>
        `;
      } else {
        cells[i].innerHTML = `<input type="text" value="${value}">`;
      }
    }
  
    button.innerHTML = '<i class="material-icons">save</i>';
    button.setAttribute('onclick', 'saveRow(this)');
  }
  
  // Eliminar una fila
  function deleteRow(button) {
    const row = button.closest('tr');
    row.remove();
    updateStats();
  }
  
  // Función para actualizar estadísticas
  function updateStats() {
    const numAlumnos = document.getElementById('alumnos-table').getElementsByTagName('tbody')[0].rows.length;
    const numProfesores = document.getElementById('profesor-table').getElementsByTagName('tbody')[0].rows.length;
  
    document.getElementById('num-alumnos').textContent = numAlumnos;
    document.getElementById('num-profesores').textContent = numProfesores;
  
    // Aquí puedes agregar lógica para actualizar "Usuarios Activos"
    document.getElementById('usuarios-activos').textContent = numAlumnos + numProfesores; // Ejemplo simple
  }
  
  // Gráficos de suscripción
  const ctx = document.getElementById('suscripcionChart').getContext('2d');
  const suscripcionChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Familiar', 'Personal', 'Becado', 'Dúo'],
      datasets: [{
        label: 'Suscripciones',
        data: [12, 19, 3, 5], // Datos de ejemplo
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
  document.querySelectorAll('li a').forEach(tab => {
    tab.addEventListener('click', function() {
        // Elimina la clase 'active' de todas las pestañas
        document.querySelectorAll('li').forEach(item => item.classList.remove('active'));
        
        // Agrega la clase 'active' solo a la pestaña seleccionada
        this.parentElement.classList.add('active');
    });
});

// Evento para redirigir a index_admin al hacer clic en GUIMAR ADMIN
document.getElementById('guimar-admin').addEventListener('click', function() {
    window.location.href = 'index_admin'; // Cambia a la URL que desees
});
// Redirigir al hacer clic en el botón Dashboard
document.getElementById('dashboard-button').addEventListener('click', function(event) {
  event.preventDefault(); // Evita que el enlace realice su comportamiento predeterminado
  window.location.href = 'dashboard'; // Cambia 'dashboard' por la URL real de tu página
});

