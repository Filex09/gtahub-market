import Link from 'next/link';

export default function Home() {
  // Datos ficticios para los objetos destacados del mercado
  const featuredItems = [
    {
      id: 1,
      name: "Camiseta España 2026",
      category: "Ropa Hombre (Legal)",
      referencePrice: "850.000 $",
      median30d: "820.000 $",
      variation: "+6.4%",
      isPositive: true,
      confidence: "Alta",
      confidenceColor: "bg-[#22C55E]",
      activeListings: 4,
      image: "👕"
    },
    {
      id: 2,
      name: "Chaqueta Racing Oficial",
      category: "Ropa Hombre (Legal)",
      referencePrice: "1.250.000 $",
      median30d: "1.200.000 $",
      variation: "+2.1%",
      isPositive: true,
      confidence: "Media",
      confidenceColor: "bg-[#3B82F6]",
      activeListings: 2,
      image: "🧥"
    },
    {
      id: 3,
      name: "Reloj Luxury Gold",
      category: "Objetos (Legal)",
      referencePrice: "3.500.000 $",
      median30d: "3.700.000 $",
      variation: "-5.4%",
      isPositive: false,
      confidence: "Alta",
      confidenceColor: "bg-[#22C55E]",
      activeListings: 6,
      image: "⌚"
    },
    {
      id: 4,
      name: "Bolsa de Viaje Premium",
      category: "Objetos (Legal)",
      referencePrice: "450.000 $",
      median30d: "450.000 $",
      variation: "0.0%",
      isPositive: true,
      confidence: "Limitada",
      confidenceColor: "bg-[#F59E0B]",
      activeListings: 1,
      image: "🎒"
    }
  ];

  // Datos ficticios para las últimas operaciones completadas
  const recentTransactions = [
    {
      id: 1,
      item: "Camiseta España 2026",
      price: "850.000 $",
      buyer: "Carlos_99",
      seller: "Juan_G",
      time: "Hace 2 horas",
      status: "COMPLETADA"
    },
    {
      id: 2,
      item: "Reloj Luxury Gold",
      price: "3.600.000 $",
      buyer: "AlexRP",
      seller: "Lucia_V",
      time: "Hace 5 horas",
      status: "COMPLETADA"
    },
    {
      id: 3,
      item: "Chaqueta Racing Oficial",
      price: "1.200.000 $",
      buyer: "Marcos_K",
      seller: "Toni_M",
      time: "Hace 1 día",
      status: "COMPLETADA"
    },
    {
      id: 4,
      item: "Bolsa de Viaje Premium",
      price: "450.000 $",
      buyer: "Sara_Dev",
      seller: "Pedro_99",
      time: "Hace 2 días",
      status: "COMPLETADA"
    }
  ];

  return (
    <div className="min-h-screen bg-[#09090B] text-[#F4F4F5] font-sans selection:bg-[#8B5CF6] selection:text-white pb-20 md:pb-0">
      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-[#27272A] bg-[#09090B]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="font-bold text-lg tracking-wider text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#8B5CF6]"></span>
              GTAHUB <span className="text-[#A1A1AA] font-normal">MARKET</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6 text-sm text-[#A1A1AA]">
              <Link href="/" className="text-white font-medium transition-colors">Mercado</Link>
              <Link href="#" className="hover:text-white transition-colors">Streamers</Link>
              <Link href="#" className="hover:text-white transition-colors">Tendencias</Link>
            </nav>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden sm:block text-xs px-2.5 py-1 rounded-full bg-[#18181B] border border-[#27272A] text-[#A1A1AA]">
              Fase de Prototipo <span className="text-[#22C55E]">●</span>
            </div>
            <Link href="#" className="text-sm font-medium px-4 py-2 rounded-lg bg-[#18181B] border border-[#27272A] hover:border-[#8B5CF6] transition-all text-white">
              Mi Perfil
            </Link>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-20 pb-16 px-4 border-b border-[#27272A]/50 bg-gradient-to-b from-[#111113]/50 to-[#09090B]">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#18181B] border border-[#27272A] text-xs text-[#A1A1AA]">
            <span className="text-[#8B5CF6]">✦</span> El mercado de referencia de GTAHUB
          </div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white">
            No solo sabes lo que vale. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#A1A1AA] to-[#8B5CF6]">
              Sabes con quién tratas.
            </span>
          </h1>
          
          <p className="text-[#A1A1AA] text-base md:text-lg max-w-xl mx-auto">
            Consulta precios de referencia basados en operaciones reales, analiza históricos y conecta con vendedores verificados.
          </p>

          {/* BUSCADOR GRANDE */}
          <div className="pt-4 max-w-2xl mx-auto">
            <div className="relative flex items-center shadow-2xl">
              <span className="absolute left-4 text-[#A1A1AA] text-lg">🔎</span>
              <input 
                type="text" 
                placeholder="¿Qué estás buscando? (ej. Camiseta España 2026)"
                className="w-full bg-[#18181B] border border-[#27272A] focus:border-[#8B5CF6] text-white placeholder-[#A1A1AA] text-sm md:text-base rounded-xl py-4 pl-12 pr-32 outline-none transition-all shadow-inner"
              />
              <button className="absolute right-2 bg-[#8B5CF6] hover:bg-[#7c3aed] text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors shadow-lg shadow-[#8B5CF6]/20">
                Buscar objeto
              </button>
            </div>
            <div className="flex items-center justify-center gap-3 text-xs text-[#A1A1AA] mt-3">
              <span>Búsquedas populares:</span>
              <span className="text-white hover:underline cursor-pointer">Camiseta España</span>
              <span>•</span>
              <span className="text-white hover:underline cursor-pointer">Chaqueta Racing</span>
              <span>•</span>
              <span className="text-white hover:underline cursor-pointer">Reloj Luxury</span>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORÍAS: ÁMBITO LEGAL E ILEGAL */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-xs uppercase tracking-widest text-[#A1A1AA] font-semibold mb-6">Explorar por Ámbito y Categorías</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* ÁMBITO LEGAL */}
          <div className="bg-[#18181B] border border-[#22C55E]/30 rounded-xl p-6 transition-all hover:border-[#22C55E]/60 shadow-lg">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#27272A]">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-[#22C55E] animate-pulse"></span>
                <h3 className="text-white font-bold text-lg tracking-wide">ÁMBITO LEGAL</h3>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-md bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/20 font-medium">Oficial / Permitido</span>
            </div>
            
            <p className="text-xs text-[#A1A1AA] mb-4">Mercado de bienes, comercios y propiedades bajo el marco legal del servidor.</p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {['Ropa Hombre', 'Ropa Mujer', 'Objetos', 'Empresas', 'Propiedades', 'Buscando'].map((sub, idx) => (
                <div key={idx} className="bg-[#111113] border border-[#27272A] hover:border-[#22C55E]/40 p-3 rounded-lg transition-all cursor-pointer group">
                  <span className="text-xs font-medium text-white group-hover:text-[#22C55E] transition-colors block">{sub}</span>
                  <span className="text-[10px] text-[#A1A1AA] mt-0.5 block">Ver anuncios</span>
                </div>
              ))}
            </div>
          </div>

          {/* ÁMBITO ILEGAL */}
          <div className="bg-[#18181B] border border-[#EF4444]/30 rounded-xl p-6 transition-all hover:border-[#EF4444]/60 shadow-lg">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#27272A]">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-[#EF4444] animate-pulse"></span>
                <h3 className="text-white font-bold text-lg tracking-wide">ÁMBITO ILEGAL</h3>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-md bg-[#EF4444]/10 text-[#EF4444] border border-[#EF4444]/20 font-medium">Mercado Subterráneo</span>
            </div>
            
            <p className="text-xs text-[#A1A1AA] mb-4">Intercambios y transacciones dentro del submundo de organizaciones y mercado negro.</p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {['Armamento', 'Objetos', 'Sustancias', 'Organizaciones', 'Buscando'].map((sub, idx) => (
                <div key={idx} className="bg-[#111113] border border-[#27272A] hover:border-[#EF4444]/40 p-3 rounded-lg transition-all cursor-pointer group">
                  <span className="text-xs font-medium text-white group-hover:text-[#EF4444] transition-colors block">{sub}</span>
                  <span className="text-[10px] text-[#A1A1AA] mt-0.5 block">Ver anuncios</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MERCADO / OBJETOS DESTACADOS */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">Objetos Destacados del Mercado</h2>
            <p className="text-xs text-[#A1A1AA] mt-1">Referencias de precios basadas en operaciones recientes</p>
          </div>
          <Link href="#" className="text-xs font-medium text-[#8B5CF6] hover:underline">
            Ver todo el mercado →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredItems.map((item) => (
            <div key={item.id} className="bg-[#18181B] border border-[#27272A] hover:border-[#27272A]/80 rounded-xl p-5 flex flex-col justify-between transition-all hover:shadow-xl group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl p-2 rounded-lg bg-[#111113] border border-[#27272A]">{item.image}</span>
                  <div className="flex items-center gap-1.5 text-xs px-2 py-1 rounded-md bg-[#111113] border border-[#27272A] text-[#A1A1AA]">
                    <span className={`w-2 h-2 rounded-full ${item.confidenceColor}`}></span>
                    Confianza {item.confidence}
                  </div>
                </div>

                <span className="text-xs text-[#22C55E] font-medium">{item.category}</span>
                <h3 className="text-white font-semibold text-base mt-1 group-hover:text-[#8B5CF6] transition-colors">{item.name}</h3>

                <div className="mt-4 pt-4 border-t border-[#27272A] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#A1A1AA]">Precio de referencia</span>
                    <span className="text-white font-bold">{item.referencePrice}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#A1A1AA]">Mediana (30d)</span>
                    <span className="text-[#A1A1AA]">{item.median30d}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#A1A1AA]">Variación</span>
                    <span className={item.isPositive ? "text-[#22C55E] font-medium" : "text-[#EF4444] font-medium"}>
                      {item.variation}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#27272A] flex items-center justify-between">
                <span className="text-xs text-[#A1A1AA]">{item.activeListings} anuncios activos</span>
                <button className="text-xs font-medium px-3 py-1.5 rounded-lg bg-[#111113] border border-[#27272A] text-white hover:border-[#8B5CF6] transition-all">
                  Ver mercado
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ÚLTIMAS OPERACIONES RECIENTES */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">Últimas Operaciones Registradas</h2>
            <p className="text-xs text-[#A1A1AA] mt-1">Operaciones reales completadas que alimentan el mercado</p>
          </div>
        </div>

        <div className="bg-[#18181B] border border-[#27272A] rounded-xl overflow-hidden">
          <div className="divide-y divide-[#27272A]">
            {recentTransactions.map((tx) => (
              <div key={tx.id} className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-[#111113]/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#111113] border border-[#27272A] flex items-center justify-center text-sm font-bold text-[#22C55E]">
                    🤝
                  </div>
                  <div>
                    <h4 className="text-white font-medium text-sm">{tx.item}</h4>
                    <p className="text-xs text-[#A1A1AA] mt-0.5">
                      Vendedor: <span className="text-white">@{tx.seller}</span> • Comprador: <span className="text-white">@{tx.buyer}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                  <div className="text-right">
                    <span className="text-white font-bold block">{tx.price}</span>
                    <span className="text-xs text-[#A1A1AA]">{tx.time}</span>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#22C55E] font-medium">
                    {tx.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#27272A] bg-[#111113]/40 py-12 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <div className="font-bold text-lg tracking-wider text-white flex items-center justify-center md:justify-start gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#8B5CF6]"></span>
              GTAHUB <span className="text-[#A1A1AA] font-normal">MARKET</span>
            </div>
            <p className="text-xs text-[#A1A1AA] max-w-md">
              Plataforma independiente desarrollada por Filex. No es un producto oficial de GTAHUB. Diseñada para estructurar el mercado y la reputación de objetos.
            </p>
          </div>

          <div className="flex items-center gap-6 text-xs text-[#A1A1AA]">
            <Link href="#" className="hover:text-white transition-colors">Términos</Link>
            <Link href="#" className="hover:text-white transition-colors">Privacidad</Link>
            <Link href="#" className="hover:text-white transition-colors">Contacto</Link>
            <span className="text-[#22C55E]">● Prototipo Activo</span>
          </div>
        </div>
      </footer>

      {/* NAVEGACIÓN MÓVIL INFERIOR */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#09090B]/95 backdrop-blur-lg border-t border-[#27272A] px-6 py-3 flex items-center justify-between z-50">
        <Link href="/" className="flex flex-col items-center gap-1 text-[#8B5CF6]">
          <span className="text-lg">🏠</span>
          <span className="text-[10px] font-medium">Inicio</span>
        </Link>
        <Link href="#" className="flex flex-col items-center gap-1 text-[#A1A1AA] hover:text-white">
          <span className="text-lg">🔎</span>
          <span className="text-[10px]">Buscar</span>
        </Link>
        <Link href="#" className="flex flex-col items-center gap-1 text-[#A1A1AA] hover:text-white">
          <span className="text-lg">🛒</span>
          <span className="text-[10px]">Mercado</span>
        </Link>
        <Link href="#" className="flex flex-col items-center gap-1 text-[#A1A1AA] hover:text-white">
          <span className="text-lg">💬</span>
          <span className="text-[10px]">Mensajes</span>
        </Link>
        <Link href="#" className="flex flex-col items-center gap-1 text-[#A1A1AA] hover:text-white">
          <span className="text-lg">👤</span>
          <span className="text-[10px]">Perfil</span>
        </Link>
      </div>
    </div>
  );
}