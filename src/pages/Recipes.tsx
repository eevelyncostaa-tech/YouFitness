import { Layout } from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { recipesData } from '@/lib/recipes-data';
import { GOAL_LABELS } from '@/lib/types';
import { ChefHat, Clock, Flame } from 'lucide-react';

export default function Recipes() {
  const { profile } = useAuth();
  
  const filteredRecipes = profile?.goal 
    ? recipesData.filter((r) => r.goal === profile.goal)
    : recipesData;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Receitas</h1>
          <p className="text-muted-foreground">
            {profile?.goal 
              ? `Receitas para ${GOAL_LABELS[profile.goal].toLowerCase()}` 
              : 'Todas as receitas disponíveis'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map((recipe, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-40 gradient-accent flex items-center justify-center">
                <ChefHat className="h-16 w-16 text-accent-foreground opacity-50" />
              </div>
              <CardContent className="p-4">
                <Badge className="mb-2">{GOAL_LABELS[recipe.goal]}</Badge>
                <h3 className="font-semibold text-lg mb-1">{recipe.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{recipe.description}</p>
                <div className="flex gap-4 text-sm text-muted-foreground mb-3">
                  <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {recipe.prep_time + recipe.cook_time}min</span>
                  <span className="flex items-center gap-1"><Flame className="h-4 w-4" /> {recipe.calories} kcal</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="bg-muted rounded p-2">
                    <p className="font-semibold">{recipe.protein}g</p>
                    <p className="text-muted-foreground">Proteína</p>
                  </div>
                  <div className="bg-muted rounded p-2">
                    <p className="font-semibold">{recipe.carbs}g</p>
                    <p className="text-muted-foreground">Carbs</p>
                  </div>
                  <div className="bg-muted rounded p-2">
                    <p className="font-semibold">{recipe.fat}g</p>
                    <p className="text-muted-foreground">Gordura</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}
