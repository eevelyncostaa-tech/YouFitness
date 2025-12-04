import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BODY_TYPE_LABELS, GOAL_LABELS, GENDER_LABELS } from '@/lib/types';
import { 
  Dumbbell, 
  ChefHat, 
  Target, 
  Heart,
  ArrowRight,
  Calendar,
  Flame,
  Trophy
} from 'lucide-react';

export default function Dashboard() {
  const { user, profile, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    } else if (!loading && profile && !profile.onboarding_completed) {
      navigate('/onboarding');
    }
  }, [user, profile, loading, navigate]);

  if (loading || !profile) {
    return (
      <Layout>
        <div className="min-h-[80vh] flex items-center justify-center">
          <div className="animate-pulse text-muted-foreground">Carregando...</div>
        </div>
      </Layout>
    );
  }

  const quickActions = [
    {
      title: 'Treinos',
      description: 'Exercícios personalizados para você',
      icon: Dumbbell,
      href: '/exercises',
      color: 'bg-primary/10 text-primary',
    },
    {
      title: 'Receitas',
      description: 'Alimentação para seus objetivos',
      icon: ChefHat,
      href: '/recipes',
      color: 'bg-[hsl(var(--accent))]/10 text-[hsl(var(--accent))]',
    },
    {
      title: 'Favoritos',
      description: 'Seus itens salvos',
      icon: Heart,
      href: '/favorites',
      color: 'bg-destructive/10 text-destructive',
    },
    {
      title: 'Perfil',
      description: 'Configurações da conta',
      icon: Target,
      href: '/profile',
      color: 'bg-muted text-muted-foreground',
    },
  ];

  const stats = [
    { label: 'Dias seguidos', value: '0', icon: Calendar },
    { label: 'Calorias hoje', value: '0', icon: Flame },
    { label: 'Metas cumpridas', value: '0', icon: Trophy },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Olá, {profile.full_name?.split(' ')[0] || 'Atleta'}! 👋
          </h1>
          <p className="text-muted-foreground">
            Pronto para mais um dia de evolução?
          </p>
        </div>

        {/* Profile Summary */}
        <Card className="mb-8 shadow-card overflow-hidden">
          <div className="gradient-primary p-6 text-primary-foreground">
            <h2 className="text-xl font-semibold mb-4">Seu Perfil Fitness</h2>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm opacity-80">Sexo</p>
                <p className="font-semibold">{profile.gender ? GENDER_LABELS[profile.gender] : '-'}</p>
              </div>
              <div>
                <p className="text-sm opacity-80">Biotipo</p>
                <p className="font-semibold">{profile.body_type ? BODY_TYPE_LABELS[profile.body_type] : '-'}</p>
              </div>
              <div>
                <p className="text-sm opacity-80">Objetivo</p>
                <p className="font-semibold">{profile.goal ? GOAL_LABELS[profile.goal] : '-'}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} className="text-center">
                <CardContent className="pt-6">
                  <Icon className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        <h2 className="text-xl font-semibold mb-4">Acesso Rápido</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link key={action.title} to={action.href}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-xl ${action.color}`}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{action.title}</h3>
                          <p className="text-sm text-muted-foreground">{action.description}</p>
                        </div>
                      </div>
                      <ArrowRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Motivation Card */}
        <Card className="bg-gradient-to-br from-secondary to-muted">
          <CardContent className="p-6 text-center">
            <p className="text-lg font-medium mb-2">💪 Dica do dia</p>
            <p className="text-muted-foreground">
              "A consistência é mais importante que a perfeição. Continue treinando!"
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
