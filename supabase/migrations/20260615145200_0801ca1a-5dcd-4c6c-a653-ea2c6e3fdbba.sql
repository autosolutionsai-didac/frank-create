
-- Storage RLS for studio-images: scope each user to their own folder (top-level = user id)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname='storage' AND tablename='objects' AND policyname='studio_images_select_own') THEN
    CREATE POLICY studio_images_select_own ON storage.objects
      FOR SELECT TO authenticated
      USING (bucket_id = 'studio-images' AND auth.uid()::text = (storage.foldername(name))[1]);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname='storage' AND tablename='objects' AND policyname='studio_images_insert_own') THEN
    CREATE POLICY studio_images_insert_own ON storage.objects
      FOR INSERT TO authenticated
      WITH CHECK (bucket_id = 'studio-images' AND auth.uid()::text = (storage.foldername(name))[1]);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname='storage' AND tablename='objects' AND policyname='studio_images_update_own') THEN
    CREATE POLICY studio_images_update_own ON storage.objects
      FOR UPDATE TO authenticated
      USING (bucket_id = 'studio-images' AND auth.uid()::text = (storage.foldername(name))[1])
      WITH CHECK (bucket_id = 'studio-images' AND auth.uid()::text = (storage.foldername(name))[1]);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname='storage' AND tablename='objects' AND policyname='studio_images_delete_own') THEN
    CREATE POLICY studio_images_delete_own ON storage.objects
      FOR DELETE TO authenticated
      USING (bucket_id = 'studio-images' AND auth.uid()::text = (storage.foldername(name))[1]);
  END IF;
END$$;
