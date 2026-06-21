interface Props {
  nombre: string; setNombre: (v: string) => void;
  empresa: string; setEmpresa: (v: string) => void;
  asunto: string; setAsunto: (v: string) => void;
  telefono: string; setTelefono: (v: string) => void;
  email: string; setEmail: (v: string) => void;
  mensaje: string; setMensaje: (v: string) => void;
  loading: boolean;
  success: boolean;
  errors: Record<string, string[]>;
  errorMessage: string;
  onSubmit: (e: React.FormEvent) => void;
}

export default function ContactForm({ nombre, setNombre, empresa, setEmpresa, asunto, setAsunto, telefono, setTelefono, email, setEmail, mensaje, setMensaje, loading, success, errors, errorMessage, onSubmit }: Props) {
  return (
    <div className="lg:col-span-7 bg-slate-50/50 border border-slate-200/80 rounded-[2.5rem] p-8 md:p-12 shadow-xl flex flex-col justify-between relative overflow-hidden">
      <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl pointer-events-none" />

      <form onSubmit={onSubmit} className="space-y-6 relative z-10">
        <h3 className="font-headline font-bold text-lg text-slate-800 mb-6 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">chat_bubble</span>
          Envíanos un Mensaje
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest">Nombre Completo</label>
            <div className="flex items-center gap-3 bg-white border border-slate-200 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/20 rounded-2xl px-4 transition-all">
              <span className="material-symbols-outlined text-slate-400 text-lg select-none">person</span>
              <input type="text" placeholder="Ej. Juan Pérez" value={nombre} onChange={(e) => setNombre(e.target.value)} required className="w-full py-3.5 bg-transparent border-none text-xs font-semibold focus:outline-none text-on-surface placeholder:text-slate-300" />
            </div>
            {errors.nombre && <p className="text-red-600 text-[10px] font-bold uppercase tracking-wider mt-1 px-1">{errors.nombre[0]}</p>}
          </div>

          <div className="space-y-2">
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest">Empresa / Negocio (Opcional)</label>
            <div className="flex items-center gap-3 bg-white border border-slate-200 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/20 rounded-2xl px-4 transition-all">
              <span className="material-symbols-outlined text-slate-400 text-lg select-none">corporate_fare</span>
              <input type="text" placeholder="Ej. Dellcom SAC" value={empresa} onChange={(e) => setEmpresa(e.target.value)} className="w-full py-3.5 bg-transparent border-none text-xs font-semibold focus:outline-none text-on-surface placeholder:text-slate-300" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest">Teléfono / Celular</label>
            <div className="flex items-center gap-3 bg-white border border-slate-200 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/20 rounded-2xl px-4 transition-all">
              <span className="material-symbols-outlined text-slate-400 text-lg select-none">call</span>
              <input type="tel" placeholder="Ej. 987654321" value={telefono} onChange={(e) => setTelefono(e.target.value.replace(/\D/g, "").slice(0, 9))} required className="w-full py-3.5 bg-transparent border-none text-xs font-semibold focus:outline-none text-on-surface placeholder:text-slate-300" />
            </div>
            {errors.telefono && <p className="text-red-600 text-[10px] font-bold uppercase tracking-wider mt-1 px-1">{errors.telefono[0]}</p>}
          </div>

          <div className="space-y-2">
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest">Correo Electrónico</label>
            <div className="flex items-center gap-3 bg-white border border-slate-200 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/20 rounded-2xl px-4 transition-all">
              <span className="material-symbols-outlined text-slate-400 text-lg select-none">alternate_email</span>
              <input type="email" placeholder="Ej. juan@correo.com" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full py-3.5 bg-transparent border-none text-xs font-semibold focus:outline-none text-on-surface placeholder:text-slate-300" />
            </div>
            {errors.correo && <p className="text-red-600 text-[10px] font-bold uppercase tracking-wider mt-1 px-1">{errors.correo[0]}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest">Asunto de la Consulta</label>
          <div className="flex items-center gap-3 bg-white border border-slate-200 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/20 rounded-2xl px-4 transition-all">
            <span className="material-symbols-outlined text-slate-400 text-lg select-none">support_agent</span>
            <select value={asunto} onChange={(e) => setAsunto(e.target.value)} className="w-full py-3.5 bg-transparent border-none text-xs font-semibold focus:outline-none text-on-surface cursor-pointer">
              <option value="Soporte Técnico">Soporte Técnico</option>
              <option value="Cotización de Servicio">Cotización de Servicio</option>
              <option value="Reparación de Laptops e Impresoras">Reparación de Laptops e Impresoras</option>
              <option value="Microelectrónica y Placas">Microelectrónica y Placas</option>
              <option value="Soporte Remoto (AnyDesk)">Soporte Remoto (AnyDesk)</option>
              <option value="Venta de Repuestos de Laptops">Venta de Repuestos de Laptops</option>
              <option value="Licencias de Software">Licencias de Software</option>
              <option value="Correos Corporativos">Correos Corporativos</option>
              <option value="Otro">Otro</option>
            </select>
          </div>
          {errors.asunto && <p className="text-red-600 text-[10px] font-bold uppercase tracking-wider mt-1 px-1">{errors.asunto[0]}</p>}
        </div>

        <div className="space-y-2">
          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest">Detalle del Mensaje o Síntoma del Equipo (Mínimo 20 caracteres)</label>
          <div className="flex items-start gap-3 bg-white border border-slate-200 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/20 rounded-2xl px-4 py-3.5 transition-all">
            <span className="material-symbols-outlined text-slate-400 text-lg select-none mt-1">edit_note</span>
            <textarea placeholder="Describe aquí detalladamente el requerimiento de soporte o cotización (mínimo 20 caracteres)..." value={mensaje} onChange={(e) => setMensaje(e.target.value)} rows={4} className="w-full bg-transparent border-none text-xs font-semibold focus:outline-none text-on-surface placeholder:text-slate-400 leading-relaxed resize-none" />
          </div>
          {errors.mensaje && <p className="text-red-600 text-[10px] font-bold uppercase tracking-wider mt-1 px-1">{errors.mensaje[0]}</p>}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <button type="submit" disabled={loading} className="w-full sm:w-auto bg-primary hover:bg-primary/95 text-white px-10 py-4.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all active:scale-95 shadow-lg shadow-primary/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50">
            {loading ? (
              <><span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />Procesando...</>
            ) : (
              <><span className="material-symbols-outlined text-sm">send</span>Enviar Solicitud</>
            )}
          </button>

          {success && (
            <div className="bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs font-bold rounded-2xl px-4 py-3.5 flex items-center gap-2 animate-fade-in-up">
              <span className="material-symbols-outlined text-emerald-500">check_circle</span>
              ¡Solicitud enviada! Nos pondremos en contacto contigo en breve.
            </div>
          )}

          {errorMessage && (
            <div className="bg-red-50 border border-red-100 text-red-800 text-xs font-bold rounded-2xl px-4 py-3.5 flex items-center gap-2 animate-fade-in-up">
              <span className="material-symbols-outlined text-red-500">error</span>
              {errorMessage}
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
