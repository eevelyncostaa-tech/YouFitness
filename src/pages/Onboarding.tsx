import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { BodyType, Goal, Gender, BODY_TYPE_LABELS, GOAL_LABELS, GENDER_LABELS } from '@/lib/types';
import { 
  User, 
  Target, 
  Dumbbell, 
  ArrowRight, 
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Minus
} from 'lucide-react';
import { cn } from '@/lib/utils';

type Step = 'gender' | 'bodyType' | 'goal';

const steps: Step[] = ['gender', 'bodyType', 'goal'];

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const [gender, setGender] = useState<Gender | null>(null);
  const [bodyType, setBodyType] = useState<BodyType | null>(null);
  const [goal, setGoal] = useState<Goal | null>(null);
  const [loading, setLoading] = useState(false);
  
  const { updateProfile } = useAuth();
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = async () => {
    if (!gender || !bodyType || !goal) {
      toast.error('Por favor, complete todas as etapas');
      return;
    }

    setLoading(true);
    const { error } = await updateProfile({
      gender,
      body_type: bodyType,
      goal,
      onboarding_completed: true,
    });

    if (error) {
      toast.error('Erro ao salvar perfil');
    } else {
      toast.success('Perfil configurado com sucesso!');
      navigate('/dashboard');
    }
    setLoading(false);
  };

  const canProceed = () => {
    switch (steps[currentStep]) {
      case 'gender':
        return gender !== null;
      case 'bodyType':
        return bodyType !== null;
      case 'goal':
        return goal !== null;
      default:
        return false;
    }
  };

  const genderOptions = [
    { value: 'male' as Gender, label: 'Masculino', icon: '👨', description: 'Treinos focados em força e hipertrofia' },
    { value: 'female' as Gender, label: 'Feminino', icon: '👩', description: 'Treinos com foco em glúteos e definição' },
  ];

  const bodyTypeOptions = [
    { 
      value: 'ectomorph' as BodyType, 
      label: 'Ectomorfo', 
      description: 'Corpo magro, dificuldade em ganhar peso. Metabolismo acelerado.',
      traits: ['Ombros estreitos', 'Membros longos', 'Pouca gordura corporal']
    },
    { 
      value: 'mesomorph' as BodyType, 
      label: 'Mesomorfo', 
      description: 'Corpo atlético natural, facilidade em ganhar músculo.',
      traits: ['Ombros largos', 'Cintura estreita', 'Resposta rápida ao treino']
    },
    { 
      value: 'endomorph' as BodyType, 
      label: 'Endomorfo', 
      description: 'Tendência a acumular gordura, metabolismo mais lento.',
      traits: ['Estrutura maior', 'Formas arredondadas', 'Boa força natural']
    },
  ];

  const goalOptions = [
    { 
      value: 'weight_gain' as Goal, 
      label: 'Ganho de Peso', 
      icon: TrendingUp,
      description: 'Aumentar massa muscular e peso corporal',
      color: 'text-[hsl(var(--primary))]'
    },
    { 
      value: 'weight_loss' as Goal, 
      label: 'Perda de Peso', 
      icon: TrendingDown,
      description: 'Reduzir gordura corporal e definir músculos',
      color: 'text-[hsl(var(--accent))]'
    },
    { 
      value: 'maintenance' as Goal, 
      label: 'Manutenção', 
      icon: Minus,
      description: 'Manter o peso atual e melhorar condicionamento',
      color: 'text-muted-foreground'
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-secondary/20 to-background p-4">
      <div className="w-full max-w-2xl">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            {steps.map((step, index) => (
              <div key={step} className="flex items-center">
                <div
                  className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition-colors',
                    index <= currentStep
                      ? 'gradient-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  )}
                >
                  {index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      'h-1 w-16 md:w-32 mx-2 rounded transition-colors',
                      index < currentStep ? 'bg-primary' : 'bg-muted'
                    )}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Sexo</span>
            <span>Biotipo</span>
            <span>Objetivo</span>
          </div>
        </div>

        <Card className="shadow-card border-border/50">
          {/* Gender Step */}
          {steps[currentStep] === 'gender' && (
            <>
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-secondary">
                    <User className="h-7 w-7 text-primary" />
                  </div>
                </div>
                <CardTitle className="text-2xl">Qual é o seu sexo?</CardTitle>
                <CardDescription>
                  Isso nos ajuda a personalizar seus treinos
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {genderOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setGender(option.value)}
                    className={cn(
                      'w-full p-6 rounded-xl border-2 text-left transition-all hover:shadow-md',
                      gender === option.value
                        ? 'border-primary bg-secondary/50'
                        : 'border-border hover:border-primary/50'
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-4xl">{option.icon}</span>
                      <div>
                        <p className="font-semibold text-lg">{option.label}</p>
                        <p className="text-sm text-muted-foreground">{option.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </CardContent>
            </>
          )}

          {/* Body Type Step */}
          {steps[currentStep] === 'bodyType' && (
            <>
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-secondary">
                    <Dumbbell className="h-7 w-7 text-primary" />
                  </div>
                </div>
                <CardTitle className="text-2xl">Qual é o seu biotipo?</CardTitle>
                <CardDescription>
                  Selecione o que mais se aproxima do seu corpo
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {bodyTypeOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setBodyType(option.value)}
                    className={cn(
                      'w-full p-6 rounded-xl border-2 text-left transition-all hover:shadow-md',
                      bodyType === option.value
                        ? 'border-primary bg-secondary/50'
                        : 'border-border hover:border-primary/50'
                    )}
                  >
                    <p className="font-semibold text-lg mb-1">{option.label}</p>
                    <p className="text-sm text-muted-foreground mb-3">{option.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {option.traits.map((trait) => (
                        <span
                          key={trait}
                          className="px-2 py-1 bg-muted rounded-full text-xs text-muted-foreground"
                        >
                          {trait}
                        </span>
                      ))}
                    </div>
                  </button>
                ))}
              </CardContent>
            </>
          )}

          {/* Goal Step */}
          {steps[currentStep] === 'goal' && (
            <>
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-secondary">
                    <Target className="h-7 w-7 text-primary" />
                  </div>
                </div>
                <CardTitle className="text-2xl">Qual é o seu objetivo?</CardTitle>
                <CardDescription>
                  Vamos criar um plano perfeito para você
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {goalOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <button
                      key={option.value}
                      onClick={() => setGoal(option.value)}
                      className={cn(
                        'w-full p-6 rounded-xl border-2 text-left transition-all hover:shadow-md',
                        goal === option.value
                          ? 'border-primary bg-secondary/50'
                          : 'border-border hover:border-primary/50'
                      )}
                    >
                      <div className="flex items-center gap-4">
                        <div className={cn('p-3 rounded-lg bg-muted', option.color)}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <div>
                          <p className="font-semibold text-lg">{option.label}</p>
                          <p className="text-sm text-muted-foreground">{option.description}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </CardContent>
            </>
          )}

          {/* Navigation */}
          <div className="px-6 pb-6 flex justify-between gap-4">
            {currentStep > 0 ? (
              <Button variant="outline" onClick={handleBack} className="flex-1">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Button>
            ) : (
              <div className="flex-1" />
            )}
            
            {currentStep < steps.length - 1 ? (
              <Button 
                variant="hero" 
                onClick={handleNext} 
                disabled={!canProceed()} 
                className="flex-1"
              >
                Próximo
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button 
                variant="hero" 
                onClick={handleComplete} 
                disabled={!canProceed() || loading} 
                className="flex-1"
              >
                {loading ? 'Salvando...' : 'Começar!'}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
