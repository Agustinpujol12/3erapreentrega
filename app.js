const productos = [
    { nombre: 'remera', imagen: 'https://piet.com.ar/wp-content/uploads/piet-remera-negra-cuadrado-blanco-01.jpg', precio: 2000 },
    { nombre: 'pantalon', imagen: 'https://tienda.guantexindustrial.com.ar/817-large_default/pantalon-jeans-bufalo-talle-46.jpg', precio: 3000 },
    { nombre: 'zapatilla', imagen: 'https://calzadosnicoar.vtexassets.com/arquivos/ids/68025740/Zapatilla-urbana-negro-mujer-kevingston-lucy-a_dyjooo.jpg?v=638271278252500000', precio: 5000 }
];

const botonesAgregar = document.querySelectorAll('.agregar-carrito');
        const listaCarrito = document.getElementById('lista-carrito');
        const carrito = document.getElementById('carrito');
        const botonMostrarCarrito = document.getElementById('mostrarCarrito');
        const botonVaciarCarrito = document.getElementById('vaciarCarrito');

        let productosEnCarrito = obtenerProductosDelCarrito();

        botonesAgregar.forEach(boton => {
            boton.addEventListener('click', () => {
                const productoId = boton.getAttribute('data-producto');
                const producto = productos.find(prod => prod.nombre === productoId);

                const productoEnCarrito = productosEnCarrito.find(prod => prod.nombre === productoId);
                if (productoEnCarrito) {
                    productoEnCarrito.cantidad++;
                } else {
                    producto.cantidad = 1;
                    productosEnCarrito.push(producto);
                }

                localStorage.setItem('productosEnCarrito', JSON.stringify(productosEnCarrito));
                actualizarCarrito();
            });
        });

        botonMostrarCarrito.addEventListener('click', () => {
            carrito.style.display = 'block';
            actualizarCarrito();
        });

        botonVaciarCarrito.addEventListener('click', () => {
            vaciarCarrito();
            actualizarCarrito();
        });

        function agregarAlCarrito(producto) {
            productosEnCarrito.push(producto);
            localStorage.setItem('productosEnCarrito', JSON.stringify(productosEnCarrito));
            actualizarCarrito();
        }

        function eliminarDelCarrito(index) {
            productosEnCarrito.splice(index, 1);
            localStorage.setItem('productosEnCarrito', JSON.stringify(productosEnCarrito));
            actualizarCarrito();
        }

        function vaciarCarrito() {
            productosEnCarrito = [];
            localStorage.removeItem('productosEnCarrito');
        }

        function obtenerProductosDelCarrito() {
            const productosGuardados = localStorage.getItem('productosEnCarrito');
            return productosGuardados ? JSON.parse(productosGuardados) : [];
        }

        function actualizarCarrito() {
            listaCarrito.innerHTML = '';
            productosEnCarrito.forEach((producto, index) => {
                const listItem = document.createElement('li');
                listItem.className = 'list-group-item';
                listItem.innerHTML = `
                    <div class="media">
                        <img src="${producto.imagen}" class="mr-3" alt="${producto.nombre}" width="50">
                        <div class="media-body">
                            <h5 class="mt-0">${producto.nombre}</h5>
                            <p>Precio: $${producto.precio}</p>
                            <p>Cantidad: ${producto.cantidad}</p>
                            <button class="btn btn-danger btn-sm float-right" onclick="eliminarDelCarrito(${index})">Eliminar</button>
                        </div>
                    </div>
                `;
                listaCarrito.appendChild(listItem);
            });
        }