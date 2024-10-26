function enviarCertificado(button) {
    // Obtiene la fila en la que está el botón
    const row = button.closest('tr');
    
    // Obtiene el nombre del alumno y el archivo del certificado
    const nombreAlumno = row.cells[0].innerText;
    const certificadoInput = row.querySelector('input[type="file"]');
    
    // Verifica si se ha seleccionado un archivo
    if (!certificadoInput.files.length) {
      alert('Por favor, selecciona un certificado antes de enviar.');
      return;
    }
    
    // Aquí puedes implementar la lógica para enviar el archivo al servidor
    const formData = new FormData();
    formData.append('certificado', certificadoInput.files[0]);
    formData.append('nombre', nombreAlumno);
    
    // Ejemplo de llamada a la API para enviar el certificado (ajusta la URL)
    fetch('/ruta/a/tu/api/certificados', {
      method: 'POST',
      body: formData,
    })
    .then(response => {
      if (response.ok) {
        alert('Certificado enviado exitosamente.');
        // Cambia el estado a "Enviado"
        const estadoSelect = row.querySelector('select');
        estadoSelect.value = 'enviado';
      } else {
        alert('Hubo un error al enviar el certificado.');
      }
    })
    .catch(error => {
      console.error('Error al enviar el certificado:', error);
      alert('Hubo un error al enviar el certificado.');
    });
  }
  document.getElementById('certificados-tab').addEventListener('click', function() {
    // Ocultar todas las secciones de contenido
    const tabs = document.querySelectorAll('.content-tab');
    tabs.forEach(tab => tab.style.display = 'none');

    // Mostrar la sección de certificados
    document.getElementById('certificados-content').style.display = 'block';
});

  