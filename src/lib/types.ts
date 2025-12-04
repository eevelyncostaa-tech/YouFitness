export type BodyType = 'ectomorph' | 'mesomorph' | 'endomorph';
export type Goal = 'weight_gain' | 'weight_loss' | 'maintenance';
export type Gender = 'male' | 'female';
export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export interface Profile {
  id: string;
  full_name: string | null;
  email: string | null;
  avatar_url: string | null;
  gender: Gender | null;
  body_type: BodyType | null;
  goal: Goal | null;
  onboarding_completed: boolean;
  created_at: string;
  updated_at: string;
}

export interface Exercise {
  id: string;
  name: string;
  description: string;
  instructions: string;
  muscle_group: string;
  body_type: BodyType[];
  gender: Gender[];
  difficulty: Difficulty;
  image_url: string | null;
  video_url: string | null;
  sets: number;
  reps: string;
  created_at: string;
}

export interface Recipe {
  id: string;
  name: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  goal: Goal;
  prep_time: number;
  cook_time: number;
  servings: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  image_url: string | null;
  created_at: string;
}

export interface WorkoutPlan {
  id: string;
  name: string;
  description: string;
  body_type: BodyType;
  gender: Gender;
  duration_weeks: number;
  days_per_week: number;
  created_at: string;
}

export interface WorkoutPlanExercise {
  id: string;
  workout_plan_id: string;
  exercise_id: string;
  day_of_week: number;
  order_index: number;
  sets: number;
  reps: string;
  rest_seconds: number;
  exercise?: Exercise;
}

export interface FavoriteExercise {
  id: string;
  user_id: string;
  exercise_id: string;
  created_at: string;
  exercise?: Exercise;
}

export interface FavoriteRecipe {
  id: string;
  user_id: string;
  recipe_id: string;
  created_at: string;
  recipe?: Recipe;
}

export const BODY_TYPE_LABELS: Record<BodyType, string> = {
  ectomorph: 'Ectomorfo',
  mesomorph: 'Mesomorfo',
  endomorph: 'Endomorfo',
};

export const GOAL_LABELS: Record<Goal, string> = {
  weight_gain: 'Ganho de Peso',
  weight_loss: 'Perda de Peso',
  maintenance: 'Manutenção',
};

export const GENDER_LABELS: Record<Gender, string> = {
  male: 'Masculino',
  female: 'Feminino',
};

export const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  beginner: 'Iniciante',
  intermediate: 'Intermediário',
  advanced: 'Avançado',
};

export const MUSCLE_GROUP_LABELS: Record<string, string> = {
  chest: 'Peito',
  back: 'Costas',
  shoulders: 'Ombros',
  biceps: 'Bíceps',
  triceps: 'Tríceps',
  legs: 'Pernas',
  glutes: 'Glúteos',
  core: 'Core',
  full_body: 'Corpo Inteiro',
};
