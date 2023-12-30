//La función para poder agrandar la imagen cuando se selecciona
const agrandarImagen = (nueva) => {
    // Se Crea un cuadro emergente con SweetAlert2 utilizando el tipo "html"
    Swal.fire({
      html: `
          <img src="${nueva}" alt="Foto de la donacion 1280x1024" class="tam1280">
      `,
      width: 1380, // Se usan estos valores para que la imagen, de dimensiones 1280x1024, caiga dentro del cuadro emergente
      height: 1124,
      showCloseButton: true,
      showConfirmButton: false,
      showCancelButton: false,
      focusConfirm: false,
      customClass: {
        closeButton: 'btn-close',
      },
      onClose: () => {
        // Cuando se cierra, se queda en la misma página
      }
    });

}
