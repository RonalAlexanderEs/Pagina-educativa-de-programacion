function guardarSolicitud() {
  const nombre = document.getElementById('solicitud-nombre').value;
  const descripcion = document.getElementById('solicitud-descripcion').value;
  const documentos = document.getElementById('solicitud-documento').files;

  if (nombre && descripcion) {
    const table = document.getElementById('becas-table').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();
    
    const docNames = Array.from(documentos).map(file => file.name).join(', ') || 'No hay documentos';

    newRow.innerHTML = `
      <td>${nombre}</td>
      <td>${descripcion}</td>
      <td>${docNames}</td>
      <td>
        <button class="btn btn-delete" onclick="deleteRow(this)"><i class="material-icons">delete</i></button>
      </td>
    `;
    
    // Limpiar campos
    document.getElementById('solicitud-nombre').value = '';
    document.getElementById('solicitud-descripcion').value = '';
    document.getElementById('solicitud-documento').value = '';
  } else {
    alert('Por favor completa todos los campos obligatorios.');
  }
}

// Función para eliminar una fila
function deleteRow(btn) {
  const row = btn.parentNode.parentNode;
  row.parentNode.removeChild(row);
}
document.getElementById('becas-tab').addEventListener('click', function() {
  showTab('becas-content'); // Cambia 'becas-content' por el ID del div correspondiente a Becas.
});
function cambiarEstado(selectElement) {
  const estadoSeleccionado = selectElement.value;
  const row = selectElement.closest('tr'); // Obtener la fila correspondiente
  const nombreEstudiante = row.cells[0].textContent; // Obtener el nombre del estudiante (columna 1)
  
  // Aquí puedes agregar la lógica adicional que necesites para manejar el cambio de estado.
  console.log(`El estado de ${nombreEstudiante} ha sido cambiado a: ${estadoSeleccionado}`);
}

function deleteSolicitud(btn) {
  const row = btn.closest('tr'); // Obtener la fila correspondiente
  row.parentNode.removeChild(row); // Eliminar la fila
}


