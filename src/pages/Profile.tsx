import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { BODY_TYPE_LABELS, GOAL_LABELS, GENDER_LABELS } from '@/lib/types';
import { useNavigate } from 'react-router-dom';
import { User, Settings } from 'lucide-react';

export default function Profile() {
  const { profile, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <h1 className="text-3xl font-bold mb-8">Meu Perfil</h1>
        
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full gradient-primary flex items-center justify-center">
                <User className="h-8 w-8 text-primary-foreground" />
              </div>
              <div>
                <CardTitle>{profile?.full_name || 'Usuário'}</CardTitle>
                <p className="text-muted-foreground">{profile?.email}</p>
              </div>
            </div>
          </CardHeader>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" /> Configurações Fitness
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Sexo</span>
              <span className="font-medium">{profile?.gender ? GENDER_LABELS[profile.gender] : '-'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Biotipo</span>
              <span className="font-medium">{profile?.body_type ? BODY_TYPE_LABELS[profile.body_type] : '-'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Objetivo</span>
              <span className="font-medium">{profile?.goal ? GOAL_LABELS[profile.goal] : '-'}</span>
            </div>
          </CardContent>
        </Card>

        <Button variant="destructive" className="w-full" onClick={handleSignOut}>
          Sair da Conta
        </Button>
      </div>
    </Layout>
  );
}
