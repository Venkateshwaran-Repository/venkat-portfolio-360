-- Drop the restrictive policy
DROP POLICY IF EXISTS "Anyone can view showcase files" ON public.showcase_files;

-- Create a permissive policy for public read access
CREATE POLICY "Public read access for showcase files"
ON public.showcase_files
FOR SELECT
TO public
USING (true);