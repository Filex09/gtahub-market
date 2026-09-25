'use client';

import { useState } from 'react';
import Link from 'next/link';
import { featuredItems } from '../data/marketData';

export default function PublicarAnuncioPage() {
  const [tipo, setTipo] = useState<'venta' | 'compra'>('venta');
  const [itemId, setItemId] = useState(featuredItems[0]?.id || 1);
  const [precio, setPrecio] = useState('');
  const [cantidad, setCantidad] = useState('1');
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEnviado(true);
  };

  return (
    <div className="min-h-screen bg-[#09090B] text-[#F4F4F5] font-sans selection:bg-[#8B5CF6] selection:text-white pb-20">
      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-[#27272A] bg-[#09090B]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="font-bold text-lg tracking-wider text-white flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#8B5CF6]"></span>
            GTAHUB <span className="text-[#A1A1AA] font-normal">MARKET</span>
          </Link>
          <Link href="/" className="text-xs text-[#A1A1AA] hover:text-white transition-colors">
            ← Volver al mercado
          </Link>
        </div>
      </header>

      {/* CONTENIDO DEL FORMULARIO */}
      <main className="max-w-xl mx-auto px-4 py-12">
        <div className="bg-[#18181B] border border-[#27272A] rounded-2xl p-6 md:p-8 shadow-xl space-y-6">
          
          <div>
            <span className="text-xs text-[#8B5CF6] font-medium uppercase tracking-wider">Gestión de Anuncios</span>
            <h1 className="text-2xl font-bold text-white mt-1">Publicar en el Mercado</h1>
            <p className="text-xs text-[#A1A1AA] mt-1">Crea un anuncio activo para conectar con compradores o vendedores en GTAHUB.</p>
          </div>

          {enviado ? (
            <div className="bg-[#22C55E]/10 border border-[#22C55E]/30 rounded-xl p-6 text-center space-y-3">
              <span className="text-3xl">🎉</span>
              <h3 className="text-white font-bold text-base">¡Anuncio publicado con éxito!</h3>
              <p className="text-xs text-[#A1A1AA]">Tu anuncio ya es visible en la plataforma de forma simulada.</p>
              <div className="pt-2">
                <Link href="/" className="px-4 py-2 rounded-lg bg-[#8B5CF6] text-white text-xs font-medium inline-block">
                  Volver al inicio
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Selector Venta / Compra */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setTipo('venta')}
                  className={`py-2.5 rounded-xl text-xs font-semibold transition-all border ${
                    tipo === 'venta'
                      ? 'bg-[#22C55E]/20 border-[#22C55E] text-[#22C55E]'
                      : 'bg-[#111113] border-[#27272A] text-[#A1A1AA]'
                  }`}
                >
                  🛒 Quiero Vender
                </button>
                <button
                  type="button"
                  onClick={() => setTipo('compra')}
                  className={`py-2.5 rounded-xl text-xs font-semibold transition-all border ${
                    tipo === 'compra'
                      ? 'bg-[#8B5CF6]/20 border-[#8B5CF6] text-[#8B5CF6]'
                      : 'bg-[#111113] border-[#27272A] text-[#A1A1AA]'
                  }`}
                >
                  🔍 Estoy Buscando
                </button>
              </div>

              {/* Selección del Ítem */}
              <div className="space-y-1.5">
                <label className="text-xs text-[#A1A1AA] font-medium block">Seleccionar Ítem</label>
                <select
                  value={itemId}
                  onChange={(e) => setItemId(Number(e.target.value))}
                  className="w-full bg-[#111113] border border-[#27272A] focus:border-[#8B5CF6] text-white text-sm rounded-xl py-3 px-3 outline-none"
                >
                  {featuredItems.map((i) => (
                    <option key={i.id} value={i.id}>
                      {i.name} ({i.category})
                    </option>
                  ))}
                </select>
              </div>

              {/* Precio */}
              <div className="space-y-1.5">
                <label className="text-xs text-[#A1A1AA] font-medium block">
                  {tipo === 'venta' ? 'Precio de Venta' : 'Presupuesto Máximo'}
                </label>
                <input
                  type="text"
                  required
                  placeholder="ej. 650.000 $"
                  value={precio}
                  onChange={(e) => setPrecio(e.target.value)}
                  className="w-full bg-[#111113] border border-[#27272A] focus:border-[#8B5CF6] text-white text-sm rounded-xl py-3 px-3 outline-none"
                />
              </div>

              {/* Cantidad / Unidades */}
              {tipo === 'venta' && (
                <div className="space-y-1.5">
                  <label className="text-xs text-[#A1A1AA] font-medium block">Cantidad disponible (unidades)</label>
                  <input
                    type="number"
                    min="1"
                    value={cantidad}
                    onChange={(e) => setCantidad(e.target.value)}
                    className="w-full bg-[#111113] border border-[#27272A] focus:border-[#8B5CF6] text-white text-sm rounded-xl py-3 px-3 outline-none"
                  />
                </div>
              )}

              {/* Botón de envío */}
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#8B5CF6] hover:bg-[#7c3aed] text-white font-medium text-sm transition-colors shadow-lg shadow-[#8B5CF6]/20 mt-4"
              >
                Publicar Anuncio en el Mercado
              </button>

            </form>
          )}

        </div>
      </main>
    </div>
  );
}