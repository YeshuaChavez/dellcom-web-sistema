const BRANCHES = [
  {
    key: "olivos",
    title: "Sede Los Olivos (Sede Principal)",
    address: "Av. Santa Elvira, Mza. E, Lote 59, Urb. San Elías, Los Olivos, Lima",
    schedule: "Lunes a Sábado: 9:00 AM - 7:00 PM",
    contact: "+51 925 981 741 / +51 922 452 929",
    mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3903.1118432328766!2d-77.0756549242084!3d-11.95772378735626!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105d04c4b69dcfb%3A0xd3b34bdf88ea4eb6!2sAv.%20Santa%20Elvira%2C%20Los%20Olivos%2015306!5e0!3m2!1ses!2spe!4v1717210000000!5m2!1ses!2spe",
    delay: "0ms",
  },
  {
    key: "santa_anita",
    title: "Sede Santa Anita",
    address: "Av. Los Nogales 510 - Santa Anita, Lima",
    schedule: "Lunes a Viernes: 9:00 AM - 8:00 PM | Sábado: 9:00 AM - 6:00 PM",
    contact: "+51 925 981 741 / +51 922 452 929",
    mapSrc: "https://maps.google.com/maps?q=Av.+Los+Nogales+510%2C+Santa+Anita%2C+Lima&t=&z=16&ie=UTF8&iwloc=&output=embed",
    delay: "100ms",
  },
];

export default function HomeLocationSection() {
  return (
    <section className="py-24 px-margin-mobile md:px-margin-desktop bg-white border-t border-slate-100">
      <div className="max-w-container-max mx-auto space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
            <span className="material-symbols-outlined text-[16px]">location_on</span>
            Nuestras Sedes
          </div>
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-on-surface">¿Dónde<span className="text-primary"> Encontrarnos?</span></h2>
          <p className="text-xs md:text-sm font-semibold text-on-surface-variant leading-relaxed">
            Visítanos en cualquiera de nuestras sucursales para soporte técnico especializado, repuestos de hardware o licencias de software originales.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {BRANCHES.map((branch) => (
            <div
              key={branch.key}
              className="scroll-reveal bg-slate-50/50 border border-slate-200/80 rounded-[2.5rem] p-8 space-y-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-all"
              style={{ transitionDelay: branch.delay }}
            >
              <div className="space-y-4">
                <h3 className="font-headline font-bold text-xl text-slate-800 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">store</span>
                  {branch.title}
                </h3>
                <div className="space-y-3 pt-2">
                  {[
                    { icon: "location_on", label: "Dirección", value: branch.address },
                    { icon: "schedule", label: "Horario de Atención", value: branch.schedule },
                    { icon: "phone_iphone", label: "Contacto", value: branch.contact },
                  ].map(({ icon, label, value }) => (
                    <div key={label} className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-primary text-lg mt-0.5">{icon}</span>
                      <div className="text-xs">
                        <p className="font-bold text-on-surface">{label}</p>
                        <p className="text-on-surface-variant mt-0.5">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-100 rounded-3xl overflow-hidden border border-slate-200 shadow-sm relative h-[250px] mt-4">
                <iframe src={branch.mapSrc} className="w-full h-full border-0 absolute inset-0" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
