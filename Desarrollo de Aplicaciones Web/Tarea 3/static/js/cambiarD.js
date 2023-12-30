//Se redirecciona a la nueva pagina y se "guarda" el ID para usarlo en informacion-donacion
const cambiar = (ID) => {
    window.location.href = "informacion-donacion?id=" + ID;
}