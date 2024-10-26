// Función para ver un mensaje
function verMensaje(btn) {
    const row = btn.parentNode.parentNode; // Obtener la fila del botón
    const remitente = row.cells[0].innerText; // Obtener remitente
    const asunto = row.cells[1].innerText; // Obtener asunto
    const fecha = row.cells[2].innerText; // Obtener fecha
  
    // Mostrar el contenido del mensaje (puedes personalizarlo)
    alert(`Remitente: ${remitente}\nAsunto: ${asunto}\nFecha: ${fecha}`);
  }
  
  // Función para eliminar un mensaje
  function eliminarMensaje(btn) {
    const row = btn.parentNode.parentNode; // Obtener la fila del botón
    row.parentNode.removeChild(row); // Eliminar la fila de la tabla
  }
  document.getElementById('bandeja-tab').addEventListener('click', function() {
    showTab('bandeja-content');
  });
  