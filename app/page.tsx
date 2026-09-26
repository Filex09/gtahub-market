'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { featuredItems } from '@/app/data/marketData';
import { supabase } from '@/app/lib/supabase';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'legal' | 'ilegal' | 'chollos'>('legal');
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [listings, setListings] = useState<any[]>([]);
  const [loadingListings, setLoadingListings] = useState(true);

  const legalCategories = ['todos', 'Ropa de hombre', 'Ropa de mujer', 'Objetos', 'Empresas', 'Propiedades'];
  const ilegalCategories = ['todos', 'Sustancias', 'Armas', 'Organizaciones', 'Objetos'];

  const currentCategories = activeTab === 'legal' ? legalCategories : activeTab === 'ilegal' ? ilegalCategories : ['todos'];

  useEffect(() => {
    async function fetchListings() {
      try {
        const { data, error } = await supabase
          .from('listings')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error al cargar anuncios:', error);
        } else {
          setListings(data || []);
        }
      } catch (err) {
        console.error('Excepción:', err);
      } finally {
        setLoadingListings(false);
      }
    }

    fetchListings();
  }, []);

  // Sugerencias de búsqueda inteligente
  const sugerenciasBusqueda = useMemo(() => {
    if (!searchQuery.trim() || searchQuery.length < 2) return { items: [], usuarioEncontrado: null };

    const query = searchQuery.toLowerCase();
    const itemsCoincidentes = featuredItems.filter(i => 
      i.name.toLowerCase().includes(query) || i.category.toLowerCase().includes(query)
    );

    const anunciosUsuario = listings.filter(l => l.usuario && l.usuario.toLowerCase().includes(query));
    let infoUsuario = null;
    if (query.includes('@') || anunciosUsuario.length > 0) {
      const nombreUsuario = anunciosUsuario.length > 0 ? anunciosUsuario[0].usuario : searchQuery;
      infoUsuario = {
        nombre: nombreUsuario,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
        estrellas: 4.8,
        totalAnuncios: anunciosUsuario.length,
      };
    }

    return { items: itemsCoincidentes, usuarioEncontrado: infoUsuario };
  }, [searchQuery, listings]);

  // FILTRADO INTELIGENTE Y SECCIÓN DE CHOLLOS
  const listingsFiltrados = useMemo(() => {
    return listings.filter((item) => {
      const matchQuery = item.item_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (item.usuario && item.usuario.toLowerCase().includes(searchQuery.toLowerCase()));

      if (!matchQuery) return false;

      // Detección automática de categoría por nombre
      const nombreLower = item.item_name ? item.item_name.toLowerCase() : '';
      let categoriaDelItem = 'Objetos';

      if (nombreLower.includes('camiseta') || nombreLower.includes('españa') || nombreLower.includes('ropa') || nombreLower.includes('pantalón') || nombreLower.includes('pantalon') || nombreLower.includes('chaqueta') || nombreLower.includes('sudadera')) {
        categoriaDelItem = 'Ropa de hombre';
      } else if (nombreLower.includes('vestido') || nombreLower.includes('falda') || nombreLower.includes('tacones')) {
        categoriaDelItem = 'Ropa de mujer';
      } else if (nombreLower.includes('hubpods') || nombreLower.includes('auriculares') || nombreLower.includes('cascos') || nombreLower.includes('reloj') || nombreLower.includes('teléfono')) {
        categoriaDelItem = 'Objetos';
      } else if (nombreLower.includes('casco táctico') || nombreLower.includes('arma') || nombreLower.includes('pistola') || nombreLower.includes('fusil')) {
        categoriaDelItem = 'Armas';
      } else if (nombreLower.includes('sustancia') || nombreLower.includes('químico') || nombreLower.includes('laboratorio')) {
        categoriaDelItem = 'Sustancias';
      } else if (nombreLower.includes('local') || nombreLower.includes('propiedad') || nombreLower.includes('casa') || nombreLower.includes('garaje')) {
        categoriaDelItem = 'Propiedades';
      }

      const ilegalList = ['Sustancias', 'Armas', 'Organizaciones'];
      const esIlegal = ilegalList.includes(categoriaDelItem);

      // Si estamos en la pestaña de Chollos
      if (activeTab === 'chollos') {
        // Determinamos un precio de referencia simulado según el ítem para calcular si es chollo
        const precioNum = parseInt(String(item.precio).replace(/[^0-9]/g, '')) || 0;
        let precioReferenciaMedio = 1000000; // 1 Millón por defecto

        if (nombreLower.includes('camiseta')) precioReferenciaMedio = 800000;
        if (nombreLower.includes('hubpods')) precioReferenciaMedio = 3500000;
        if (nombreLower.includes('casco')) precioReferenciaMedio = 1500000;

        // Es chollo si el precio es al menos un 15% más barato que el de referencia
        const esChollo = precioNum <= precioReferenciaMedio * 0.85;
        if (!esChollo) return false;
      } else {
        // Pestañas normales Legal / Ilegal
        if (activeTab === 'legal' && esIlegal) return false;
        if (activeTab === 'ilegal' && !esIlegal) return false;
      }

      if (activeTab !== 'chollos' && selectedCategory !== 'todos') {
        return categoriaDelItem.trim().toLowerCase() === selectedCategory.trim().toLowerCase();
      }

      return true;
    });
  }, [listings, searchQuery, selectedCategory, activeTab]);

  const formatearFechaRelativa = (fechaIso: string) => {
    try {
      const fecha = new Date(fechaIso);
      return formatDistanceToNow(fecha, { addSuffix: true, locale: es });
    } catch (e) {
      return 'Hace un momento';
    }
  };

  const obtenerAvatarUsuario = (usuario: string) => {
    return 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80';
  };

  return (
    <div className="min-h-screen bg-[#09090B] text-[#F4F4F5] font-sans selection:bg-[#8B5CF6] selection:text-white pb-20">
      <header className="sticky top-0 z-50 border-b border-[#27272A] bg-[#09090B]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4 sm:gap-6">
            <span className="font-bold text-base sm:text-lg tracking-wider text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#8B5CF6]"></span>
              GTAHUB <span className="text-[#A1A1AA] font-normal hidden sm:inline">MARKET</span>
            </span>

            <div className="flex bg-[#18181B] border border-[#27272A] p-1 rounded-xl">
              <button
                onClick={() => { setActiveTab('legal'); setSelectedCategory('todos'); }}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${activeTab === 'legal' ? 'bg-[#27272A] text-white shadow-sm' : 'text-[#A1A1AA] hover:text-white'}`}
              >
                ⚖️ Legal
              </button>
              <button
                onClick={() => { setActiveTab('ilegal'); setSelectedCategory('todos'); }}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${activeTab === 'ilegal' ? 'bg-[#8B5CF6] text-white shadow-sm' : 'text-[#A1A1AA] hover:text-white'}`}
              >
                🥷 Ilegal
              </button>
              <button
                onClick={() => { setActiveTab('chollos'); setSelectedCategory('todos'); }}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${activeTab === 'chollos' ? 'bg-amber-500 text-black font-bold shadow-sm' : 'text-amber-400 hover:text-white'}`}
              >
                🔥 Chollos
              </button>
            </div>
          </div>

          <Link
            href="/publicar"
            className="px-3 py-2 rounded-xl bg-[#8B5CF6] hover:bg-[#7c3aed] text-white font-medium text-xs transition-colors shadow-lg shadow-[#8B5CF6]/20 flex items-center gap-1.5"
          >
            <span>+</span> <span className="hidden sm:inline">Publicar Anuncio</span><span className="sm:hidden">Publicar</span>
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        
        {/* BARRA DE BÚSQUEDA Y CATEGORÍAS */}
        <div className="space-y-4 relative max-w-2xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Busca un artículo (ej. Camiseta)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#18181B] border border-[#27272A] focus:border-[#8B5CF6] text-white text-sm rounded-2xl py-3.5 px-5 outline-none shadow-xl"
            />
            <span className="absolute right-4 top-3.5 text-[#A1A1AA] text-sm">🔍</span>
          </div>

          {/* Categorías secundarias (Solo visibles si no estamos en Chollos) */}
          {activeTab !== 'chollos' && (
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none pt-2">
              {currentCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all border ${
                    selectedCategory === cat ? 'bg-[#27272A] border-[#8B5CF6] text-white' : 'bg-[#18181B] border-[#27272A] text-[#A1A1AA] hover:text-white'
                  }`}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* SECCIÓN DE ANUNCIOS */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${activeTab === 'chollos' ? 'bg-amber-400' : 'bg-[#22C55E]'}`}></span>
              {activeTab === 'chollos' ? '🔥 Oportunidades y Chollos del Mercado' : `Anuncios Activos (${selectedCategory === 'todos' ? 'Todas las categorías' : selectedCategory})`}
            </h2>
            <span className="text-xs text-[#A1A1AA]">{listingsFiltrados.length} encontrados</span>
          </div>

          {loadingListings ? (
            <div className="text-center py-16 text-xs text-[#A1A1AA]">Cargando anuncios...</div>
          ) : listingsFiltrados.length === 0 ? (
            <div className="bg-[#18181B] border border-[#27272A] rounded-2xl p-12 text-center space-y-3">
              <span className="text-3xl">📭</span>
              <h3 className="text-white font-medium text-sm">No hay anuncios en esta sección</h3>
              <p className="text-xs text-[#A1A1AA]">Prueba a revisar más tarde o publica un nuevo artículo.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {listingsFiltrados.map((item) => {
                const itemCatalogo = featuredItems.find((i) => i.id === Number(item.item_id));
                const imagenFinal = item.imagen_url || itemCatalogo?.image || null;
                const tiempoPublicacion = item.created_at ? formatearFechaRelativa(item.created_at) : 'Hace un momento';
                const nombreUsuario = item.usuario || '@Anónimo';
                const avatarUsuario = obtenerAvatarUsuario(nombreUsuario);

                return (
                  <div key={item.id} className="bg-[#18181B] border border-[#27272A] rounded-2xl p-4 space-y-3 hover:border-[#8B5CF6]/50 transition-all flex flex-col justify-between shadow-md relative overflow-hidden">
                    {activeTab === 'chollos' && (
                      <span className="absolute top-0 right-0 bg-amber-500 text-black text-[9px] font-extrabold px-2.5 py-1 rounded-bl-xl">
                        🔥 CHOLLO
                      </span>
                    )}
                    <div className="space-y-2.5">
                      <div className="flex justify-between items-center pr-6">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${item.tipo === 'venta' ? 'bg-[#22C55E]/10 text-[#22C55E]' : 'bg-[#8B5CF6]/10 text-[#8B5CF6]'}`}>
                          {item.tipo === 'venta' ? '🛒 VENTA' : '🔍 BUSCA'}
                        </span>
                        
                        <Link href={`/perfil/${encodeURIComponent(nombreUsuario)}`} className="flex items-center gap-1.5 hover:opacity-80 transition-opacity group">
                          <img src={avatarUsuario} alt={nombreUsuario} className="w-5 h-5 rounded-full border border-[#8B5CF6] object-cover" />
                          <span className="text-[10px] text-[#8B5CF6] font-semibold group-hover:underline">{nombreUsuario}</span>
                        </Link>
                      </div>

                      <h3 className="text-sm font-bold text-white leading-tight">{item.item_name}</h3>
                      
                      {imagenFinal ? (
                        <div className="w-full h-36 rounded-xl overflow-hidden bg-[#111113] border border-[#27272A] flex items-center justify-center p-1">
                          <img src={imagenFinal} alt={item.item_name} className="object-contain h-full w-full rounded-lg" />
                        </div>
                      ) : (
                        <div className="w-full h-24 rounded-xl bg-[#111113] border border-[#27272A]/50 flex items-center justify-center text-center p-2">
                          <span className="text-xs text-[#A1A1AA]">Sin imagen</span>
                        </div>
                      )}
                    </div>

                    <div className="pt-3 border-t border-[#27272A] space-y-2">
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-[10px] text-[#A1A1AA] block">Precio / Presupuesto</span>
                          <span className="text-xs font-bold text-white">{item.precio}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] text-[#A1A1AA] block">Unidades</span>
                          <span className="text-xs font-bold text-[#8B5CF6]">{item.cantidad || 1} uds.</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-2 pt-1 text-[10px] text-[#71717A] border-t border-[#27272A] mt-2">
                        <span>⏰ Publicado</span>
                        <span className="font-medium text-[#A1A1AA]">{tiempoPublicacion}</span>
                      </div>

                      <button
                        onClick={() => alert(`Iniciando canal de contacto con el vendedor ${nombreUsuario}`)}
                        className="w-full py-2 bg-[#27272A] hover:bg-[#8B5CF6] text-white rounded-xl text-[11px] font-medium transition-colors flex items-center justify-center gap-1.5"
                      >
                        <span>💬</span> Contactar con vendedor
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </main>
    </div>
  );
}
