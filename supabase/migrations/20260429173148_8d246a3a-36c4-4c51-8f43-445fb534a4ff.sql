create or replace view public.participation_kpis
with (security_invoker = on) as
select
  year,
  round(avg(retail_allocation_pct), 1) as avg_retail_alloc_pct,
  round((percentile_cont(0.5) within group (order by retail_coverage_multiple::double precision))::numeric, 1) as median_retail_coverage,
  count(*) filter (where is_undersubscribed) as undersubscribed_count,
  count(*) as total_ipos,
  round(avg(retail_subscribers) / 1000::numeric) as avg_subscribers_thousands
from public.ipo_participation
group by year;

grant select on public.participation_kpis to anon, authenticated;