/**
 * Componente cliente que activa animaciones de entrada al hacer scroll.
 * Observa todos los elementos con la clase CSS "scroll-reveal" en el documento.
 * Cuando un elemento entra en el viewport (≥10% visible), le agrega la clase
 * "reveal-active" y deja de observarlo (la animación solo ocurre una vez).
 * No renderiza HTML propio (devuelve null); es puramente lógica de efecto.
 */
"use client";

import { useEffect } from "react";

export default function ScrollRevealObserver() {
  useEffect(() => {
    // threshold:0.1 → dispara cuando al menos el 10% del elemento es visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-active");
            observer.unobserve(entry.target); // solo anima una vez
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".scroll-reveal").forEach((el) => {
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return null;
}
