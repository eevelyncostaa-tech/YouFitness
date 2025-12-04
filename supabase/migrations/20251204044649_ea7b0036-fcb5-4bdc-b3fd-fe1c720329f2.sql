-- Create profiles table for user data
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  email TEXT,
  avatar_url TEXT,
  gender TEXT CHECK (gender IN ('male', 'female')),
  body_type TEXT CHECK (body_type IN ('ectomorph', 'mesomorph', 'endomorph')),
  goal TEXT CHECK (goal IN ('weight_gain', 'weight_loss', 'maintenance')),
  onboarding_completed BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Create exercises table
CREATE TABLE public.exercises (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  instructions TEXT NOT NULL,
  muscle_group TEXT NOT NULL,
  body_type TEXT[] NOT NULL,
  gender TEXT[] NOT NULL,
  difficulty TEXT CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  image_url TEXT,
  video_url TEXT,
  sets INTEGER DEFAULT 3,
  reps TEXT DEFAULT '10-12',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS for exercises (public read)
ALTER TABLE public.exercises ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view exercises"
  ON public.exercises FOR SELECT
  USING (true);

-- Create recipes table
CREATE TABLE public.recipes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  ingredients TEXT[] NOT NULL,
  instructions TEXT[] NOT NULL,
  goal TEXT CHECK (goal IN ('weight_gain', 'weight_loss', 'maintenance')) NOT NULL,
  prep_time INTEGER NOT NULL,
  cook_time INTEGER NOT NULL,
  servings INTEGER DEFAULT 1,
  calories INTEGER NOT NULL,
  protein INTEGER NOT NULL,
  carbs INTEGER NOT NULL,
  fat INTEGER NOT NULL,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS for recipes (public read)
ALTER TABLE public.recipes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view recipes"
  ON public.recipes FOR SELECT
  USING (true);

-- Create workout_plans table
CREATE TABLE public.workout_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  body_type TEXT CHECK (body_type IN ('ectomorph', 'mesomorph', 'endomorph')) NOT NULL,
  gender TEXT CHECK (gender IN ('male', 'female')) NOT NULL,
  duration_weeks INTEGER DEFAULT 4,
  days_per_week INTEGER DEFAULT 5,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS for workout plans (public read)
ALTER TABLE public.workout_plans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view workout plans"
  ON public.workout_plans FOR SELECT
  USING (true);

-- Create workout_plan_exercises junction table
CREATE TABLE public.workout_plan_exercises (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workout_plan_id UUID REFERENCES public.workout_plans(id) ON DELETE CASCADE NOT NULL,
  exercise_id UUID REFERENCES public.exercises(id) ON DELETE CASCADE NOT NULL,
  day_of_week INTEGER NOT NULL CHECK (day_of_week >= 1 AND day_of_week <= 7),
  order_index INTEGER NOT NULL,
  sets INTEGER DEFAULT 3,
  reps TEXT DEFAULT '10-12',
  rest_seconds INTEGER DEFAULT 60
);

-- Enable RLS for workout plan exercises (public read)
ALTER TABLE public.workout_plan_exercises ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view workout plan exercises"
  ON public.workout_plan_exercises FOR SELECT
  USING (true);

-- Create favorite_exercises table
CREATE TABLE public.favorite_exercises (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  exercise_id UUID REFERENCES public.exercises(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, exercise_id)
);

-- Enable RLS for favorite exercises
ALTER TABLE public.favorite_exercises ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own favorite exercises"
  ON public.favorite_exercises FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can add favorite exercises"
  ON public.favorite_exercises FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove favorite exercises"
  ON public.favorite_exercises FOR DELETE
  USING (auth.uid() = user_id);

-- Create favorite_recipes table
CREATE TABLE public.favorite_recipes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  recipe_id UUID REFERENCES public.recipes(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, recipe_id)
);

-- Enable RLS for favorite recipes
ALTER TABLE public.favorite_recipes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own favorite recipes"
  ON public.favorite_recipes FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can add favorite recipes"
  ON public.favorite_recipes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove favorite recipes"
  ON public.favorite_recipes FOR DELETE
  USING (auth.uid() = user_id);

-- Function to handle new user profiles
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email)
  VALUES (NEW.id, NEW.raw_user_meta_data ->> 'full_name', NEW.email);
  RETURN NEW;
END;
$$;

-- Trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for profile updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();