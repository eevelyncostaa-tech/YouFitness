import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/layout/Layout';
import { Dumbbell, ChefHat, Target, Zap, ArrowRight } from 'lucide-react';
import heroImage from '@/assets/hero-fitness.jpg';

export default function Index() {
  const features = [
    { icon: Dumbbell, title: 'Treinos Personalizados', description: 'Planos de exercícios baseados no seu biotipo corporal' },
    { icon: ChefHat, title: 'Receitas Fitness', description: 'Alimentação para ganho, perda ou manutenção de peso' },
    { icon: Target, title: 'Metas Claras', description: 'Acompanhe seu progresso rumo aos objetivos' },
    { icon: Zap, title: 'Resultados Rápidos', description: 'Metodologia eficiente para transformação' },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={heroImage} alt="Fitness" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/80" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Transforme seu corpo com{' '}
              <span className="text-gradient">YouFitness+</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Treinos personalizados para seu biotipo, receitas para seus objetivos 
              e tudo que você precisa para alcançar a melhor versão de si mesmo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="xl" asChild>
                <Link to="/auth?tab=signup">
                  Começar Agora <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="xl" asChild>
                <Link to="/auth">Já tenho conta</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Por que escolher o YouFitness+?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="bg-card p-6 rounded-xl shadow-card text-center">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl gradient-primary mb-4">
                    <Icon className="h-7 w-7 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Pronto para começar?</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Junte-se a milhares de pessoas que já estão transformando suas vidas.
          </p>
          <Button variant="hero" size="xl" asChild>
            <Link to="/auth?tab=signup">Criar Conta Grátis</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
