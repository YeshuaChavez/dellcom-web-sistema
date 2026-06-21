import { Producto, Categoria } from "./types";

export const fallbackCategories: Categoria[] = [
  { id: 0, nombre: "Todos" },
  { id: 1, nombre: "Ribbons y Tintas" },
  { id: 2, nombre: "Memorias y Discos" },
  { id: 3, nombre: "Tarjetas ZEBRA" },
  { id: 5, nombre: "Periféricos y Accesorios" },
  { id: 6, nombre: "Licencias de Software" },
];

export const fallbackProducts: Producto[] = [
  { id: 50, nombre: "Ribbon de Cera Zebra 110x74", descripcion: "Rollo de cinta ribbon de cera de alta calidad para impresoras térmicas industriales y de escritorio.", precio: 45.00, imagen_url: "/img/productos/ribbon-cera.jpg", categoria: { nombre: "Ribbons y Tintas" } },
  { id: 51, nombre: "Tinta Original HP GT53 Negra", descripcion: "Botella de tinta negra original HP GT53. Diseñado para imprimir con calidad profesional constante.", precio: 39.00, imagen_url: "/img/productos/tinta-hp-664.jpg", categoria: { nombre: "Ribbons y Tintas" } },
  { id: 52, nombre: "Disco Externo 2TB Toshiba", descripcion: "Disco duro externo portátil de 2TB. Conexión USB 3.0 de alta velocidad y diseño ultra compacto.", precio: 289.00, imagen_url: "/img/productos/disco-externo-1tb.jpg", categoria: { nombre: "Memorias y Discos" } },
  { id: 53, nombre: "Memoria RAM DDR4 8GB Crucial Laptop", descripcion: "Memoria RAM DDR4 de alto rendimiento. Ideal para repotenciar laptops y mejorar la multitarea.", precio: 115.00, imagen_url: "/img/productos/ram-8gb-ddr4.jpg", categoria: { nombre: "Memorias y Discos" } },
  { id: 54, nombre: "Tarjeta de Limpieza Zebra", descripcion: "Tarjetas de limpieza originales para impresoras de tarjetas Zebra. Alarga la vida útil del equipo.", precio: 75.00, imagen_url: "/img/productos/ribbon-zebra-800300-350la.jpg", categoria: { nombre: "Tarjetas ZEBRA" } },
  { id: 55, nombre: "Licencia Windows 11 Pro OEM", descripcion: "Clave de activación digital original OEM de Windows 11 Professional. Activación permanente.", precio: 149.00, imagen_url: "/img/productos/windows_11_pro.jpg", categoria: { nombre: "Licencias de Software" } },
  { id: 56, nombre: "Licencia Office 2024 Professional Plus", descripcion: "Clave digital original de Office 2024 Pro Plus. Incluye Word, Excel, PowerPoint, Outlook, Teams y Access.", precio: 349.00, imagen_url: "/img/productos/office_2024.jpg", categoria: { nombre: "Licencias de Software" } },
  { id: 67, nombre: "Licencia Windows 11 Home Retail", descripcion: "Clave de activación digital original Retail de Windows 11 Home. Activación permanente.", precio: 119.00, imagen_url: "/img/productos/windows_11_home.jpg", categoria: { nombre: "Licencias de Software" } },
  { id: 57, nombre: "Disco SSD Kingston A400 480GB SATA", descripcion: "SSD SATA III 2.5\". Velocidad de lectura hasta 500MB/s para repotenciar laptops y PCs.", precio: 180.00, imagen_url: "/img/productos/ssd-480gb.jpg", categoria: { nombre: "Memorias y Discos" } },
  { id: 58, nombre: "Memoria USB 3.2 Kingston Exodia 32GB", descripcion: "Memoria USB Kingston DataTraveler Exodia con conexión USB 3.2 Gen 1.", precio: 29.00, imagen_url: "/img/productos/memoria-usb-32gb.jpg", categoria: { nombre: "Memorias y Discos" } },
  { id: 59, nombre: "Cinta Ribbon Zebra YMCKO 800300-350LA", descripcion: "Cinta ribbon de color YMCKO para impresoras Zebra ZC100 y ZC300. Hasta 350 impresiones.", precio: 290.00, imagen_url: "/img/productos/ribbon-zebra-800300-350la.jpg", categoria: { nombre: "Tarjetas ZEBRA" } },
  { id: 60, nombre: "Etiquetas Térmicas Directas 102x152mm", descripcion: "Rollo de etiquetas térmicas autoadhesivas para despacho, Courier y rotulado (500 etiquetas).", precio: 45.00, imagen_url: "/img/productos/etiquetas-termicas.jpg", categoria: { nombre: "Ribbons y Tintas" } },
  { id: 64, nombre: "Mouse Inalámbrico Logitech M170", descripcion: "Mouse inalámbrico 2.4GHz ergonómico y ambidiestro. Receptor USB plug and play.", precio: 45.00, imagen_url: "/img/productos/mouse-logitech.jpg", categoria: { nombre: "Periféricos y Accesorios" } },
  { id: 65, nombre: "Teclado Logitech K120 USB", descripcion: "Teclado cableado estándar USB resistente a salpicaduras. Teclas silenciosas y perfil plano.", precio: 38.00, imagen_url: "/img/productos/teclado-logitech.jpg", categoria: { nombre: "Periféricos y Accesorios" } },
  { id: 66, nombre: "Mousepad Ergonómico con Apoya Muñeca de Gel", descripcion: "Mousepad ergonómico con base antideslizante y relleno de gel suave.", precio: 25.00, imagen_url: "/img/productos/mousepad.jpg", categoria: { nombre: "Periféricos y Accesorios" } },
];
