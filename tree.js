// Nodo del Árbol Binario
class Nodo {
    constructor(valor) {
      this.valor = valor;
      this.izquierdo = null;
      this.derecho = null;
    }
  }
  
  // Árbol Binario
  class ArbolBinario {
    constructor() {
      this.raiz = null;
    }
  
    // Insertar valor en el árbol
    insertar(valor) {
      const nuevoNodo = new Nodo(valor);
      if (this.raiz === null) {
        this.raiz = nuevoNodo;
      } else {
        this.#insertarNodo(this.raiz, nuevoNodo);
      }
      this.mostrarMensaje(`Valor ${valor} agregado al árbol`);
    }
  
    // Método recursivo para insertar un nodo
    #insertarNodo(nodo, nuevoNodo) {
      if (nuevoNodo.valor < nodo.valor) {
        if (nodo.izquierdo === null) {
          nodo.izquierdo = nuevoNodo;
        } else {
          this.#insertarNodo(nodo.izquierdo, nuevoNodo);
        }
      } else {
        if (nodo.derecho === null) {
          nodo.derecho = nuevoNodo;
        } else {
          this.#insertarNodo(nodo.derecho, nuevoNodo);
        }
      }
    }
  
    // Buscar un valor en el árbol
    buscar(valor) {
      const resultado = this.#buscarNodo(this.raiz, valor);
      if (resultado) {
        this.mostrarMensaje(`Valor ${valor} encontrado en el árbol`);
      } else {
        this.mostrarMensaje(`Valor ${valor} no encontrado`);
      }
      return resultado;
    }
  
    #buscarNodo(nodo, valor) {
      if (nodo === null) {
        return null;
      }
      if (valor === nodo.valor) {
        return nodo;
      } else if (valor < nodo.valor) {
        return this.#buscarNodo(nodo.izquierdo, valor);
      } else {
        return this.#buscarNodo(nodo.derecho, valor);
      }
    }
  
    // Eliminar un valor del árbol
    eliminar(valor) {
      this.raiz = this.#eliminarNodo(this.raiz, valor);
      this.mostrarMensaje(`Valor ${valor} eliminado del árbol`);
    }
  
    #eliminarNodo(nodo, valor) {
      if (nodo === null) {
        return null;
      }
      if (valor < nodo.valor) {
        nodo.izquierdo = this.#eliminarNodo(nodo.izquierdo, valor);
        return nodo;
      } else if (valor > nodo.valor) {
        nodo.derecho = this.#eliminarNodo(nodo.derecho, valor);
        return nodo;
      } else {
        if (nodo.izquierdo === null && nodo.derecho === null) {
          return null;
        }
        if (nodo.izquierdo === null) {
          return nodo.derecho;
        } else if (nodo.derecho === null) {
          return nodo.izquierdo;
        }
        const minNodo = this.#encontrarMin(nodo.derecho);
        nodo.valor = minNodo.valor;
        nodo.derecho = this.#eliminarNodo(nodo.derecho, minNodo.valor);
        return nodo;
      }
    }
  
    #encontrarMin(nodo) {
      while (nodo.izquierdo !== null) {
        nodo = nodo.izquierdo;
      }
      return nodo;
    }
  
    // Mostrar mensaje
    mostrarMensaje(mensaje) {
      const mensajeDiv = document.getElementById('mensaje');
      mensajeDiv.textContent = mensaje;
      mensajeDiv.style.opacity = 1;
      setTimeout(() => {
        mensajeDiv.style.opacity = 0;
      }, 2000);
    }
  
    // Mostrar el árbol en orden
    enOrden() {
      const resultado = [];
      this.#enOrdenRecursivo(this.raiz, resultado);
      return resultado;
    }
  
    #enOrdenRecursivo(nodo, resultado) {
      if (nodo !== null) {
        this.#enOrdenRecursivo(nodo.izquierdo, resultado);
        resultado.push(nodo.valor);
        this.#enOrdenRecursivo(nodo.derecho, resultado);
      }
    }
  }
  
  // Lógica para el manejo de eventos y dibujo en el canvas
  const arbol = new ArbolBinario();
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  
  function agregar() {
    const valor = parseInt(document.getElementById('valorInput').value);
    if (!isNaN(valor)) {
      arbol.insertar(valor);
      dibujarArbol();
    } else {
      arbol.mostrarMensaje('Ingrese un número válido');
    }
  }
  
  function buscar() {
    const valor = parseInt(document.getElementById('valorInput').value);
    arbol.buscar(valor);
  }
  
  function eliminar() {
    const valor = parseInt(document.getElementById('valorInput').value);
    arbol.eliminar(valor);
    dibujarArbol();
  }
  
  // Dibuja el árbol en el canvas
  function dibujarArbol() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas
    if (arbol.raiz !== null) {
      dibujarNodo(arbol.raiz, canvas.width / 2, 50, canvas.width / 4);
    }
  }
  
  // Función recursiva para dibujar un nodo
  function dibujarNodo(nodo, x, y, espacioHorizontal) {
    if (nodo !== null) {
      // Dibujar nodo actual
      ctx.beginPath();
      ctx.arc(x, y, 20, 0, 2 * Math.PI);
      ctx.fillStyle = '#ff9f68';
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = '#fff';
      ctx.textAlign = 'center';
      ctx.font = '16px Arial';
      ctx.fillText(nodo.valor, x, y + 5);
  
      // Dibujar líneas de conexión con los hijos
      if (nodo.izquierdo !== null) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x - espacioHorizontal, y + 70);
        ctx.stroke();
        dibujarNodo(nodo.izquierdo, x - espacioHorizontal, y + 70, espacioHorizontal / 2);
      }
  
      if (nodo.derecho !== null) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + espacioHorizontal, y + 70);
        ctx.stroke();
        dibujarNodo(nodo.derecho, x + espacioHorizontal, y + 70, espacioHorizontal / 2);
      }
    }
  }
  