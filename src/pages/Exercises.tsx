import { Layout } from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { exercisesData } from '@/lib/exercises-data';
import { MUSCLE_GROUP_LABELS, DIFFICULTY_LABELS } from '@/lib/types';
import { Dumbbell } from 'lucide-react';

export default function Exercises() {
  const { profile } = useAuth();
  
  const filteredExercises = exercisesData.filter((ex) => {
    if (!profile?.gender || !profile?.body_type) return true;
    return ex.gender.includes(profile.gender) && ex.body_type.includes(profile.body_type);
  });

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Exercícios</h1>
          <p className="text-muted-foreground">
            {profile?.gender && profile?.body_type 
              ? 'Exercícios personalizados para você' 
              : 'Todos os exercícios disponíveis'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExercises.map((exercise, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-40 gradient-primary flex items-center justify-center">
                <Dumbbell className="h-16 w-16 text-primary-foreground opacity-50" />
              </div>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary">{MUSCLE_GROUP_LABELS[exercise.muscle_group] || exercise.muscle_group}</Badge>
                  <Badge variant="outline">{DIFFICULTY_LABELS[exercise.difficulty]}</Badge>
                </div>
                <h3 className="font-semibold text-lg mb-1">{exercise.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{exercise.description}</p>
                <div className="flex gap-4 text-sm text-muted-foreground">
                  <span>{exercise.sets} séries</span>
                  <span>{exercise.reps} reps</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}
