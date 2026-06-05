-- Make the Frank Body preset library editable in-app. Presets are a SHARED
-- brand library: any signed-in (@frankbody.com) user can create/edit/delete.
-- (0001 already grants SELECT to authenticated; 0003 added emoji/prompt.)

drop policy if exists "insert presets" on public.presets;
create policy "insert presets" on public.presets
  for insert to authenticated with check (true);

drop policy if exists "update presets" on public.presets;
create policy "update presets" on public.presets
  for update to authenticated using (true) with check (true);

drop policy if exists "delete presets" on public.presets;
create policy "delete presets" on public.presets
  for delete to authenticated using (true);
