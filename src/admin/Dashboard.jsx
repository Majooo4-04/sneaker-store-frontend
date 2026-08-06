import React from 'react';
import AdminLayout from './AdminLayout';

export default function Dashboard() {
  return (
    <AdminLayout title="Dashboard">
      <div className="space-y-6">
        <section className="grid gap-4 md:grid-cols-3">
          {[
            { title: 'Ventas', value: '$24.8k', color: 'bg-black text-white' },
            { title: 'Pedidos', value: '128', color: 'bg-white text-gray-900' },
            { title: 'Usuarios activos', value: '1,245', color: 'bg-white text-gray-900' },
          ].map((card) => (
            <div key={card.title} className={`rounded-2xl border border-gray-200 p-5 shadow-sm ${card.color}`}>
              <p className="text-sm opacity-80">{card.title}</p>
              <p className="mt-2 text-2xl font-black">{card.value}</p>
            </div>
          ))}
        </section>

        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-black text-gray-950">Resumen del mes</h2>
          <p className="mt-2 text-sm text-gray-500">Aquí puedes mostrar gráficos, métricas y alertas de negocio.</p>
        </section>
      </div>
    </AdminLayout>
  );
}
