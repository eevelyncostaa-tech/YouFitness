import { Layout } from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Heart } from 'lucide-react';

export default function Favorites() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Favoritos</h1>
        <p className="text-muted-foreground mb-8">Seus treinos e receitas salvos</p>
        
        <Card className="text-center py-16">
          <CardContent>
            <Heart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="font-semibold text-lg mb-2">Nenhum favorito ainda</h3>
            <p className="text-muted-foreground">Salve exercícios e receitas para acessá-los rapidamente aqui.</p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
