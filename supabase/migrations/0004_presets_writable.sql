-- Make the Frank Body preset library editable in-app. Presets are a SHARED
-- brand library: any signed-in (@frankbody.com) user can create/edit/delete.
-- (0001 already grants SELECT to authenticated; 0003 added emoji/prompt.)

create policy "insert presets" on public.presets
  for insert to authenticated with check (true);

create policy "update presets" on public.presets
  for update to authenticated using (true) with check (true);

create policy "delete presets" on public.presets
  for delete to authenticated using (true);
