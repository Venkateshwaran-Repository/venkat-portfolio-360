-- Create storage bucket for showcase files
INSERT INTO storage.buckets (id, name, public)
VALUES ('showcase-files', 'showcase-files', true);

-- Create table for file metadata
CREATE TABLE public.showcase_files (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  file_type text NOT NULL,
  file_size bigint NOT NULL,
  storage_path text NOT NULL,
  category text NOT NULL,
  uploaded_by uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now() NOT NULL
);

-- Enable RLS
ALTER TABLE public.showcase_files ENABLE ROW LEVEL SECURITY;

-- Allow anyone to view files (public read)
CREATE POLICY "Anyone can view showcase files"
  ON public.showcase_files
  FOR SELECT
  USING (true);

-- Only authenticated users can upload files
CREATE POLICY "Authenticated users can upload files"
  ON public.showcase_files
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = uploaded_by);

-- Only file owner can delete their files
CREATE POLICY "Users can delete their own files"
  ON public.showcase_files
  FOR DELETE
  TO authenticated
  USING (auth.uid() = uploaded_by);

-- Storage policies for the bucket
CREATE POLICY "Anyone can view files in showcase bucket"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'showcase-files');

CREATE POLICY "Authenticated users can upload to showcase bucket"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'showcase-files');

CREATE POLICY "Users can delete their own files from showcase bucket"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'showcase-files' AND auth.uid()::text = (storage.foldername(name))[1]);