// mobile

let socket;
let imgElement;

function setup() {
    createCanvas(400, 400);
    background(220);

    let socketUrl = 'http://localhost:3000';
    socket = io(socketUrl);

    socket.on('connect', () => {
        console.log('Connected to server');
    });

    // Recibir imagen desde el servidor
    socket.on('image', (data) => {
        console.log('Imagen recibida');

        if (imgElement) {
            imgElement.remove(); // Eliminar imagen anterior
        }

        imgElement = createImg(data, 'Foto recibida');
        imgElement.hide(); // Ocultar HTML

        // Asegurar que se redibuja correctamente
        setTimeout(() => {
            redraw(); // Forzar redibujado después de recibir la imagen
        }, 100);
    });

    noLoop(); // Evita que draw() se ejecute en bucle
}

function draw() {
    background(220);
    if (imgElement) {
        image(imgElement, 50, 50, 300, 300); // Dibujar la imagen en el canvas
    }
}

