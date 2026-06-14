import { z } from "zod";

const ContactSchema = z.object({
  nombre: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  correo: z.string().email("El correo electronico no es valido"),
  telefono: z.string().nullable().optional(),
  asunto: z.string().min(3, "El asunto debe tener al menos 3 caracteres"),
  mensaje: z.string().min(5, "El mensaje debe tener al menos 5 caracteres"),
});

describe("Pruebas de Validacion de Esquemas con Zod", () => {
  it("deberia pasar la validacion con datos de contacto correctos", () => {
    const validData = {
      nombre: "Juan Perez",
      correo: "juan.perez@example.com",
      telefono: "987654321",
      asunto: "Soporte Tecnico",
      mensaje: "Tengo un problema con la impresora Zebra que no imprime etiquetas.",
    };

    const parsed = ContactSchema.safeParse(validData);
    expect(parsed.success).toBe(true);
  });

  it("deberia fallar si el nombre es demasiado corto", () => {
    const invalidData = {
      nombre: "Jo",
      correo: "juan@example.com",
      asunto: "Soporte",
      mensaje: "Ayuda",
    };

    const parsed = ContactSchema.safeParse(invalidData);
    expect(parsed.success).toBe(false);
    if (!parsed.success) {
      expect(parsed.error.flatten().fieldErrors.nombre).toBeDefined();
    }
  });

  it("deberia fallar si el correo no es valido", () => {
    const invalidData = {
      nombre: "Juan Perez",
      correo: "correo-invalido",
      asunto: "Soporte",
      mensaje: "Ayuda con la impresora",
    };

    const parsed = ContactSchema.safeParse(invalidData);
    expect(parsed.success).toBe(false);
  });
});
