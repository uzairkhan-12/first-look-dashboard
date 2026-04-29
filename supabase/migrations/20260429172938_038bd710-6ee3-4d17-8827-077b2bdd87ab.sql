create policy "Public can read ipo participation"
on public.ipo_participation
for select
to anon, authenticated
using (true);

grant select on public.ipo_participation to anon, authenticated;
grant select on public.participation_kpis to anon, authenticated;