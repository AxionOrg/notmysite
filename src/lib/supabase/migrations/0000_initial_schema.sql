-- Users and Profiles
CREATE TABLE public.profiles (
    id uuid NOT NULL REFERENCES auth.users ON DELETE CASCADE,
    updated_at timestamptz,
    display_name text,
    avatar_url text,
    target_university text,
    hsc_result text,
    PRIMARY KEY (id)
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public profiles are viewable by everyone." ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile." ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile." ON public.profiles FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- Function to create a profile for a new user
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name, avatar_url)
  VALUES (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  RETURN new;
END;
$$;

-- Trigger to call the function when a new user signs up
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();


-- User Favorites and Bookmarks
CREATE TABLE public.user_favorite_exams (
    user_id uuid NOT NULL REFERENCES auth.users ON DELETE CASCADE,
    exam_id text NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY (user_id, exam_id)
);

ALTER TABLE public.user_favorite_exams ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their own favorite exams." ON public.user_favorite_exams
    FOR ALL
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE TABLE public.user_subject_bookmarks (
    user_id uuid NOT NULL REFERENCES auth.users ON DELETE CASCADE,
    subject_id text NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY (user_id, subject_id)
);

ALTER TABLE public.user_subject_bookmarks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their own subject bookmarks." ON public.user_subject_bookmarks
    FOR ALL
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- RPC Function for user self-deletion
CREATE OR REPLACE FUNCTION public.delete_user()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  -- This will cascade delete all related data in tables with foreign keys to auth.users
  DELETE FROM auth.users WHERE id = auth.uid();
END;
$$;

GRANT EXECUTE ON FUNCTION public.delete_user() TO authenticated;


-- SCALABLE STRUCTURE FOR FUTURE FEATURES (e.g., Courses)

-- Courses Table
CREATE TABLE public.courses (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    title text NOT NULL,
    description text,
    created_at timestamptz NOT NULL DEFAULT now(),
    author_id uuid REFERENCES public.profiles(id) ON DELETE SET NULL
);
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Courses are viewable by everyone." ON public.courses FOR SELECT USING (true);

-- Enrollments Table (Many-to-Many between users and courses)
CREATE TABLE public.enrollments (
    user_id uuid NOT NULL REFERENCES auth.users ON DELETE CASCADE,
    course_id uuid NOT NULL REFERENCES public.courses ON DELETE CASCADE,
    enrolled_at timestamptz NOT NULL DEFAULT now(),
    progress numeric(5, 2) NOT NULL DEFAULT 0.00,
    PRIMARY KEY (user_id, course_id)
);
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view and manage their own enrollments." ON public.enrollments
    FOR ALL
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Course Modules Table
CREATE TABLE public.modules (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    course_id uuid NOT NULL REFERENCES public.courses ON DELETE CASCADE,
    title text NOT NULL,
    "order" integer NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.modules ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Modules are viewable by everyone." ON public.modules FOR SELECT USING (true);

-- Course Lessons Table
CREATE TABLE public.lessons (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    module_id uuid NOT NULL REFERENCES public.modules ON DELETE CASCADE,
    title text NOT NULL,
    content text,
    video_url text,
    "order" integer NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Lessons are viewable by enrolled users." ON public.lessons
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1
            FROM public.enrollments e
            JOIN public.modules m ON e.course_id = m.course_id
            WHERE m.id = lessons.module_id AND e.user_id = auth.uid()
        )
    );


-- User Lesson Progress Table
CREATE TABLE public.lesson_progress (
    user_id uuid NOT NULL REFERENCES auth.users ON DELETE CASCADE,
    lesson_id uuid NOT NULL REFERENCES public.lessons ON DELETE CASCADE,
    completed_at timestamptz,
    PRIMARY KEY (user_id, lesson_id)
);

ALTER TABLE public.lesson_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their own lesson progress." ON public.lesson_progress
    FOR ALL
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);
