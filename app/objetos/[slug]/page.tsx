'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import { featuredItems, recentTransactions } from '../../data/marketData';

export default function ItemDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const itemId = parseInt(resolvedParams.slug);
  
  const foundItem = featuredItems.find((i) => i.id === itemId);

  const [viewType, setViewType] = useState('Semanal'); 
  const [subOption, setSubOption] = useState('Jueves'); 
  const [isImageOpen, setIsImageOpen] = useState(false); 
  
  const [hoveredPoint, setHoveredPoint] = useState<{
    time: string;
    date: string;
    price: string;
    x: number;
    y: number;
  } | null>(null);

  if (!foundItem) {
    return (
      <div className="min-h-screen bg-[#09090B] text-[#F4F4F5] flex flex-col items-center justify-center p-6 font-sans">
        <h1 className="text-2xl font-bold text-white mb-2">Ítem no encontrado</h1>
        <p className="text-xs text-[#A1A1AA] mb-6">El objeto que buscas no existe en el registro del mercado.</p>
        <Link href="/" className="px-4 py-2 rounded-lg bg-[#8B5CF6] text-white text-sm font-medium">
          ← Volver al inicio
        </Link>
      </div>
    );
  }

  const item = {
    name: foundItem.name,
    category: foundItem.category,
    referencePrice: foundItem.referencePrice,
    median7d: foundItem.median30d,
    median30d: foundItem.median30d,
    median90d: foundItem.referencePrice,
    minPrice: "600.000 $",
    maxPrice: "6.500.000 $",
    lastOperation: "Hace 2 días",
    totalOperations: foundItem.activeListings * 5,
    image: foundItem.image
  };

  const calculateY = (priceStr: string) => {
    const numericPrice = parseInt(priceStr.replace(/[^0-9]/g, '')) || 800000;
    const minVal = 500000; 
    const maxVal = 7000000; 
    const clamped = Math.max(minVal, Math.min(maxVal, numericPrice));
    const percentage = (clamped - minVal) / (maxVal - minVal);
    return 85 - (percentage * 70);
  };

  const rawDataByDay: Record<string, { time: string; date: string; price: string; x: number }[]> = {
    "Lunes": [
      { time: "08:00", date: "Lunes, 21 de septiembre de 2026", price: item.referencePrice, x: 50 },
      { time: "14:00", date: "Lunes, 21 de septiembre de 2026", price: item.referencePrice, x: 200 },
      { time: "20:00", date: "Lunes, 21 de septiembre de 2026", price: item.referencePrice, x: 350 }
    ],
    "Martes": [
      { time: "08:00", date: "Martes, 22 de septiembre de 2026", price: item.referencePrice, x: 50 },
      { time: "14:00", date: "Martes, 22 de septiembre de 2026", price: item.referencePrice, x: 200 },
      { time: "20:00", date: "Martes, 22 de septiembre de 2026", price: item.referencePrice, x: 350 }
    ],
    "Miércoles": [
      { time: "08:00", date: "Miércoles, 23 de septiembre de 2026", price: item.referencePrice, x: 50 },
      { time: "14:00", date: "Miércoles, 23 de septiembre de 2026", price: item.referencePrice, x: 200 },
      { time: "20:00", date: "Miércoles, 23 de septiembre de 2026", price: item.referencePrice, x: 350 }
    ],
    "Jueves": [
      { time: "02:00", date: "Jueves, 24 de septiembre de 2026", price: item.referencePrice, x: 20 },
      { time: "08:00", date: "Jueves, 24 de septiembre de 2026", price: item.referencePrice, x: 130 },
      { time: "14:00", date: "Jueves, 24 de septiembre de 2026", price: item.referencePrice, x: 240 },
      { time: "20:00", date: "Jueves, 24 de septiembre de 2026", price: item.referencePrice, x: 350 }
    ],
    "Viernes": [],
    "Sábado": [],
    "Domingo": []
  };

  const rawDataByZoom: Record<string, { time: string; date: string; price: string; x: number }[]> = {
    "1m": [
      { time: "Sem 1", date: "1 - 7 Septiembre, 2026", price: item.referencePrice, x: 50 },
      { time: "Sem 2", date: "8 - 14 Septiembre, 2026", price: item.referencePrice, x: 150 },
      { time: "Sem 3", date: "15 - 21 Septiembre, 2026", price: item.referencePrice, x: 250 },
      { time: "Sem 4", date: "22 - 28 Septiembre, 2026", price: item.referencePrice, x: 350 }
    ],
    "3m": [
      { time: "Julio", date: "Mes de Julio, 2026", price: item.referencePrice, x: 60 },
      { time: "Agosto", date: "Mes de Agosto, 2026", price: item.referencePrice, x: 200 },
      { time: "Septiembre", date: "Septiembre, 2026", price: item.referencePrice, x: 340 }
    ],
    "6m": [
      { time: "Abril", date: "Mes de Abril, 2026", price: item.referencePrice, x: 40 },
      { time: "Mayo", date: "Mes de Mayo, 2026", price: item.referencePrice, x: 100 },
      { time: "Junio", date: "Mes de Junio, 2026", price: item.referencePrice, x: 160 },
      { time: "Julio", date: "Mes de Julio, 2026", price: item.referencePrice, x: 220 },
      { time: "Agosto", date: "Mes de Agosto, 2026", price: item.referencePrice, x: 280 },
      { time: "Septiembre", date: "Septiembre, 2026", price: item.referencePrice, x: 340 }
    ],
    "Todo": [
      { time: "2024", date: "Año 2024", price: item.referencePrice, x: 50 },
      { time: "2025", date: "Año 2025", price: item.referencePrice, x: 200 },
      { time: "2026", date: "Año 2026 (Actual)", price: item.referencePrice, x: 350 }
    ]
  };

  const mapWithY = (list: { time: string; date: string; price: string; x: number }[]) =>
    list.map(pt => ({ ...pt, y: calculateY(pt.price) }));

  const currentPoints = viewType === 'Mensual' 
    ? mapWithY(rawDataByZoom[subOption] || [])
    : mapWithY(rawDataByDay[subOption] || []);

  const svgPathString = currentPoints.length > 0 
    ? currentPoints.reduce((acc, pt, idx) => (idx === 0 ? `M ${pt.x},${pt.y}` : `${acc} L ${pt.x},${pt.y}`), "")
    : "";

  // Anuncios con valoración de estrellas
  const activeSellListings = [
    { id: 1, seller: "Carlos_99", rating: "4.9", operations: 24, price: item.referencePrice, stock: 1, time: "Hace 3 horas" },
    { id: 2, seller: "Juan_G", rating: "4.7", operations: 12, price: item.referencePrice, stock: 2, time: "Hace 5 horas" }
  ];

  const activeBuyListings = [
    { id: 1, buyer: "Lucia_V", rating: "4.8", operations: 9, budget: item.referencePrice, time: "Hace 1 hora" }
  ];

  return (
    <div className="min-h-screen bg-[#09090B] text-[#F4F4F5] font-sans selection:bg-[#22C55E] selection:text-white pb-20 md:pb-12">
      <header className="sticky top-0 z-50 border-b border-[#27272A] bg-[#09090B]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="font-bold text-lg tracking-wider text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#8B5CF6]"></span>
              GTAHUB <span className="text-[#A1A1AA] font-normal">MARKET</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-xs text-[#A1A1AA] hover:text-white transition-colors">
              ← Volver al inicio
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* CABECERA */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-[#18181B] border border-[#27272A] rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div 
                  onClick={() => item.image.startsWith('/') && setIsImageOpen(true)}
                  className={`w-24 h-24 relative bg-[#111113] border border-[#27272A] rounded-xl flex items-center justify-center overflow-hidden p-2 shadow-inner ${
                    item.image.startsWith('/') ? 'cursor-pointer group hover:border-[#8B5CF6] transition-all' : ''
                  }`}
                  title={item.image.startsWith('/') ? "Haz clic para ampliar la imagen" : ""}
                >
                  {item.image.startsWith('/') ? (
                    <>
                      <img src={item.image} alt={item.name} className="object-cover w-full h-full group-hover:scale-110 transition-transform" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-[10px] text-white font-medium">
                        🔍 Ampliar
                      </div>
                    </>
                  ) : (
                    <span className="text-4xl">{item.image}</span>
                  )}
                </div>
              </div>
              <span className="text-xs text-[#22C55E] font-medium">{item.category}</span>
              <h1 className="text-2xl font-bold text-white mt-1">{item.name}</h1>
            </div>
            <div className="mt-6 pt-4 border-t border-[#27272A] flex items-center justify-between">
              <span className="text-xs text-[#A1A1AA]">Operaciones totales</span>
              <span className="text-white font-semibold text-sm">{item.totalOperations} registradas</span>
            </div>
          </div>

          <div className="lg:col-span-2 bg-gradient-to-br from-[#18181B] to-[#111113] border border-[#27272A] rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs uppercase tracking-wider text-[#A1A1AA] font-semibold">Precio de Referencia de Mercado</span>
                <span className="text-xs text-[#22C55E] bg-[#22C55E]/10 border border-[#22C55E]/20 px-2.5 py-0.5 rounded-full">Basado en Mediana</span>
              </div>
              <div className="flex items-baseline gap-4 my-2">
                <span className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">{item.referencePrice}</span>
                <span className="text-sm text-[#22C55E] font-medium">+6.4% este mes</span>
              </div>
              <p className="text-xs text-[#A1A1AA]">El precio de referencia se calcula mediante la mediana de operaciones reales para evitar distorsiones por valores extremos.</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-[#27272A]">
              <div>
                <span className="text-[11px] text-[#A1A1AA] block">Mediana 7 días</span>
                <span className="text-white font-bold text-sm mt-0.5 block">{item.median7d}</span>
              </div>
              <div>
                <span className="text-[11px] text-[#A1A1AA] block">Mediana 30 días</span>
                <span className="text-white font-bold text-sm mt-0.5 block">{item.median30d}</span>
              </div>
              <div>
                <span className="text-[11px] text-[#A1A1AA] block">Mínimo registrado</span>
                <span className="text-white font-bold text-sm mt-0.5 block">{item.minPrice}</span>
              </div>
              <div>
                <span className="text-[11px] text-[#A1A1AA] block">Máximo registrado</span>
                <span className="text-white font-bold text-sm mt-0.5 block">{item.maxPrice}</span>
              </div>
            </div>
          </div>
        </div>

        {/* MODAL PARA AMPLIAR IMAGEN */}
        {isImageOpen && item.image.startsWith('/') && (
          <div 
            onClick={() => setIsImageOpen(false)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
          >
            <div className="relative bg-[#18181B] border border-[#27272A] rounded-2xl p-6 max-w-lg w-full flex flex-col items-center shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <button 
                onClick={() => setIsImageOpen(false)}
                className="absolute top-4 right-4 text-[#A1A1AA] hover:text-white bg-[#111113] border border-[#27272A] w-8 h-8 rounded-full flex items-center justify-center transition-colors"
              >
                ✕
              </button>
              <h3 className="text-white font-bold text-base mb-4">{item.name}</h3>
              <div className="w-72 h-72 relative bg-[#111113] border border-[#27272A] rounded-xl overflow-hidden p-4 flex items-center justify-center">
                <img src={item.image} alt={item.name} className="object-contain w-full h-full drop-shadow-lg" />
              </div>
              <p className="text-xs text-[#A1A1AA] mt-4">Haz clic fuera de la ventana para cerrar.</p>
            </div>
          </div>
        )}

        {/* GRÁFICA */}
        <div className="bg-[#18181B] border border-[#27272A] rounded-2xl p-6 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#27272A] pb-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#A1A1AA]">VISTA:</span>
              <div className="flex items-center bg-[#111113] border border-[#27272A] p-1 rounded-lg text-xs">
                {['Semanal', 'Mensual'].map((mode) => (
                  <button
                    key={mode}
                    onClick={() => {
                      setViewType(mode);
                      setSubOption(mode === 'Semanal' ? 'Jueves' : '3m');
                    }}
                    className={`px-3 py-1.5 rounded transition-all font-medium ${
                      viewType === mode
                        ? 'bg-[#27272A] text-white shadow'
                        : 'text-[#A1A1AA] hover:text-white'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              {viewType === 'Mensual' ? (
                ['1m', '3m', '6m', 'Todo'].map((zoom) => (
                  <button
                    key={zoom}
                    onClick={() => setSubOption(zoom)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase transition-all ${
                      subOption === zoom
                        ? 'bg-[#22C55E] text-black shadow-lg'
                        : 'bg-[#111113] border border-[#27272A] text-[#A1A1AA] hover:text-white'
                    }`}
                  >
                    {zoom}
                  </button>
                ))
              ) : (
                [
                  { label: 'Lunes', date: '21 Sep' },
                  { label: 'Martes', date: '22 Sep' },
                  { label: 'Miércoles', date: '23 Sep' },
                  { label: 'Jueves', date: '24 Sep' },
                  { label: 'Viernes', date: '25 Sep' },
                  { label: 'Sábado', date: '26 Sep' },
                  { label: 'Domingo', date: '27 Sep' }
                ].map((d) => (
                  <button
                    key={d.label}
                    onClick={() => setSubOption(d.label)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      subOption === d.label
                        ? 'bg-white text-black shadow-lg'
                        : 'bg-[#111113] border border-[#27272A] text-[#A1A1AA] hover:text-white'
                    }`}
                  >
                    {d.label} <span className="text-[10px] opacity-70">({d.date})</span>
                  </button>
                ))
              )}
            </div>
          </div>

          <div className="relative h-72 w-full pt-4">
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none text-[11px] text-[#A1A1AA] pb-8">
              <div className="flex justify-between items-center border-b border-[#27272A]/60 pb-1"><span>Máximo</span></div>
              <div className="flex justify-between items-center border-b border-[#27272A]/60 pb-1"><span>Alto</span></div>
              <div className="flex justify-between items-center border-b border-[#27272A]/60 pb-1"><span>Medio</span></div>
              <div className="flex justify-between items-center border-b border-[#27272A]/60 pb-1"><span>Base</span></div>
            </div>

            <div className="absolute inset-0 pl-12 pr-4 pb-8 pt-2 flex items-center justify-center">
              {currentPoints.length === 0 ? (
                <div className="text-center space-y-2 z-20">
                  <span className="text-2xl">⏳</span>
                  <p className="text-xs text-[#A1A1AA] font-medium">Sin datos ni operaciones registradas para este periodo.</p>
                </div>
              ) : (
                <svg viewBox="0 0 380 100" preserveAspectRatio="none" className="w-full h-full overflow-visible">
                  <defs>
                    <linearGradient id="financialGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#22C55E" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#22C55E" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  <path
                    d={`${svgPathString} L 380,100 L 20,100 Z`}
                    fill="url(#financialGradient)"
                  />

                  <path
                    d={svgPathString}
                    fill="none"
                    stroke="#22C55E"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {currentPoints.map((pt, idx) => (
                    <g key={idx} className="cursor-pointer" onMouseEnter={() => setHoveredPoint(pt)}>
                      <circle cx={pt.x} cy={pt.y} r="8" className="fill-transparent" />
                      <circle cx={pt.x} cy={pt.y} r="3" className="fill-[#22C55E] stroke-[#18181B] stroke-[1.5]" />
                    </g>
                  ))}
                </svg>
              )}

              {hoveredPoint && currentPoints.length > 0 && (
                <div 
                  className="absolute bg-[#E4E4E7] text-black text-xs rounded-lg p-2.5 shadow-2xl pointer-events-none border border-white/20 space-y-1 transition-all duration-150 z-30"
                  style={{
                    left: `${(hoveredPoint.x / 380) * 100}%`,
                    top: `${hoveredPoint.y - 10}%`,
                    transform: 'translate(-50%, -100%)'
                  }}
                >
                  <p className="text-[10px] text-zinc-600 font-medium">
                    {hoveredPoint.date} {viewType === 'Semanal' ? `, ${hoveredPoint.time}` : ''}
                  </p>
                  <div className="flex items-center gap-1.5 font-bold text-black text-sm">
                    <span className="w-2 h-2 rounded-full bg-[#22C55E]"></span>
                    Precio: {hoveredPoint.price}
                  </div>
                </div>
              )}
            </div>

            <div className="absolute inset-x-0 bottom-0 pl-12 pr-4 flex justify-between text-[11px] text-[#A1A1AA]">
              {currentPoints.length > 0 ? (
                currentPoints.map((pt, i) => <span key={i}>{pt.time}</span>)
              ) : (
                <span className="w-full text-center">Sin registros temporales</span>
              )}
            </div>
          </div>
        </div>

        {/* VENDEDORES Y COMPRADORES CON VALORACIÓN DE ESTRELLAS ⭐ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <span>🛒</span> Vendedores Activos ({activeSellListings.length})
            </h2>
            <div className="space-y-3">
              {activeSellListings.map((listing) => (
                <div key={listing.id} className="bg-[#18181B] border border-[#27272A] hover:border-[#8B5CF6]/50 rounded-xl p-4 flex items-center justify-between transition-all">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-semibold text-sm">@{listing.seller}</span>
                      {/* Reputación por estrellas */}
                      <span className="text-xs px-2 py-0.5 rounded-md bg-[#111113] border border-[#27272A] text-yellow-400 font-medium flex items-center gap-1">
                        ⭐ {listing.rating} <span className="text-[#A1A1AA] text-[10px]">({listing.operations} op.)</span>
                      </span>
                    </div>
                    <p className="text-xs text-[#A1A1AA] mt-1">Cantidad: {listing.stock} ud. • Publicado {listing.time}</p>
                  </div>
                  <div className="text-right flex items-center gap-4">
                    <div>
                      <span className="text-white font-bold block text-base">{listing.price}</span>
                      <span className="text-[10px] text-[#22C55E]">Precio de anuncio</span>
                    </div>
                    <button className="bg-[#8B5CF6] hover:bg-[#7c3aed] text-white text-xs font-medium px-3.5 py-2 rounded-lg transition-colors">
                      Contactar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <span>🔍</span> Usuarios Buscando ({activeBuyListings.length})
            </h2>
            <div className="space-y-3">
              {activeBuyListings.map((buying) => (
                <div key={buying.id} className="bg-[#18181B] border border-[#27272A] hover:border-[#8B5CF6]/50 rounded-xl p-4 flex items-center justify-between transition-all">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-semibold text-sm">@{buying.buyer}</span>
                      {/* Reputación por estrellas */}
                      <span className="text-xs px-2 py-0.5 rounded-md bg-[#111113] border border-[#27272A] text-yellow-400 font-medium flex items-center gap-1">
                        ⭐ {buying.rating} <span className="text-[#A1A1AA] text-[10px]">({buying.operations} op.)</span>
                      </span>
                    </div>
                    <p className="text-xs text-[#A1A1AA] mt-1">Busca este objeto • {buying.time}</p>
                  </div>
                  <div className="text-right flex items-center gap-4">
                    <div>
                      <span className="text-white font-bold block text-base">{buying.budget}</span>
                      <span className="text-[10px] text-[#A1A1AA]">Presupuesto</span>
                    </div>
                    <button className="bg-[#111113] border border-[#27272A] hover:border-[#8B5CF6] text-white text-xs font-medium px-3.5 py-2 rounded-lg transition-colors">
                      Vender
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}