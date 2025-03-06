// desktop

let socket;
let capture;
let captureButton;
let sendButton;
let fileInput;
let imgCanvas;

function setup() {
    createCanvas(400, 400);
    background(220);

    let socketUrl = 'http://localhost:3000';
    socket = io(socketUrl);

    socket.on('connect', () => {
        console.log('Connected to server');
    });

    // Inicializar la cámara
    capture = createCapture(VIDEO);
    capture.size(400, 300);
    capture.hide(); // Ocultar el video en vivo

    // Botón para tomar foto
    captureButton = createButton('📷 Tomar Foto');
    captureButton.position(10, height + 10);
    captureButton.mousePressed(takePhoto);

    // Botón para enviar la foto
    sendButton = createButton('📤 Enviar Foto');
    sendButton.position(110, height + 10);
    sendButton.mousePressed(sendPhoto);
    sendButton.hide(); // Se mostrará después de tomar una foto

    // Input para subir imágenes
    fileInput = createFileInput(handleFile);
    fileInput.position(250, height + 10);
}

// Tomar una foto con la cámara
function takePhoto() {
    imgCanvas = capture.get(); // Capturar imagen actual del video
    sendButton.show(); // Mostrar botón de enviar
}

// Manejar una imagen subida desde el sistema de archivos
function handleFile(file) {
    if (file.type === 'image') {
        console.log('Imagen cargada desde archivos');
        imgCanvas = loadImage(file.data, () => {
            sendPhoto(); // Enviar la imagen automáticamente
        });
    }
}

// Enviar la imagen al servidor
function sendPhoto() {
    if (imgCanvas) {
        let imgData = imgCanvas.canvas.toDataURL(); // Convertir a Base64
        console.log('Enviando imagen...');
        socket.emit('image', imgData);
        sendButton.hide(); // Ocultar botón de enviar después de enviarla
    }
}

function draw() {
    background(220);
    image(capture, 0, 0, 400, 300); // Mostrar el video en vivo

    if (imgCanvas) {
        image(imgCanvas, 50, 320, 100, 75); // Previsualizar la imagen tomada o cargada
    }
}

