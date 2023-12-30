//Se recupera ID de la página anterior y se usa para encontrar que fila debería mostrar
const urlParams = new URLSearchParams(window.location.search);
const ID = urlParams.get('id');
let fila = document.getElementById(ID);
fila.hidden = false;

//La función para poder agrandar la imagen cuando se selecciona
const agrandarImagen = (nueva) => {
    // Se Crea un cuadro emergente con SweetAlert2 utilizando el tipo "html"
    Swal.fire({
      html: `
          <img src="${nueva}" alt="Imagen">
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
