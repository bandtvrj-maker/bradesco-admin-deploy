import { useEffect, useState } from 'react';
import { trpc } from '@/lib/trpc';

export default function Cliente() {
  const [html, setHtml] = useState<string>('');
  const { data, isLoading } = trpc.cliente.getHtml.useQuery();

  useEffect(() => {
    if (data?.html) {
      setHtml(data.html);
    }
  }, [data]);

  if (isLoading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <p>Carregando cliente...</p>
      </div>
    );
  }

  if (data?.error) {
    return (
      <div style={{ padding: '20px', textAlign: 'center', color: 'red' }}>
        <p>Erro ao carregar cliente</p>
      </div>
    );
  }

  return (
    <div
      dangerouslySetInnerHTML={{ __html: html }}
      style={{ width: '100%', minHeight: '100vh', margin: 0, padding: 0 }}
    />
  );
}
