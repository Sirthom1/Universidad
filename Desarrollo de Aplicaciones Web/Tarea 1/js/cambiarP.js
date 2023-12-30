//Se redirecciona a la nueva pagina y se "guarda" el ID para usarlo en informacion-pedido
const cambiar = (ID) => {
    window.location.href = "informacion-pedido.html?id=" + ID;
}