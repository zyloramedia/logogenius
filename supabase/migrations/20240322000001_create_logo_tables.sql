-- Create user_credits table
CREATE TABLE IF NOT EXISTS public.user_credits (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    credits integer NOT NULL DEFAULT 0,
    created_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- Create logo_generations table
CREATE TABLE IF NOT EXISTS public.logo_generations (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
    brand_name text NOT NULL,
    slogan text,
    business_description text NOT NULL,
    color_preferences text[] NOT NULL,
    logo_style text NOT NULL,
    prompt text NOT NULL,
    variations_count integer NOT NULL DEFAULT 3,
    status text NOT NULL DEFAULT 'pending',
    created_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- Create generated_logos table
CREATE TABLE IF NOT EXISTS public.generated_logos (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    generation_id uuid NOT NULL REFERENCES public.logo_generations(id) ON DELETE CASCADE,
    logo_id text NOT NULL,
    image_url text NOT NULL,
    download_url text NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Enable realtime for all tables
alter publication supabase_realtime add table user_credits;
alter publication supabase_realtime add table logo_generations;
alter publication supabase_realtime add table generated_logos;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_credits_user_id ON public.user_credits(user_id);
CREATE INDEX IF NOT EXISTS idx_logo_generations_user_id ON public.logo_generations(user_id);
CREATE INDEX IF NOT EXISTS idx_generated_logos_generation_id ON public.generated_logos(generation_id);

-- Add unique constraint to user_id in user_credits table
ALTER TABLE public.user_credits ADD CONSTRAINT unique_user_credits_user_id UNIQUE (user_id);

-- Insert default credits for existing users (optional)
INSERT INTO public.user_credits (user_id, credits)
SELECT id, 5 FROM auth.users
WHERE id NOT IN (SELECT user_id FROM public.user_credits WHERE user_id IS NOT NULL)
ON CONFLICT (user_id) DO NOTHING;
