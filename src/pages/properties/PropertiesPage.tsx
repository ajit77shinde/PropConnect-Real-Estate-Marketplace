import { useEffect, useMemo, useState } from 'react';
import { Box, Container, Typography, TextField, InputAdornment, FormControl, InputLabel, Select, MenuItem, Stack, Drawer, Button, useMediaQuery, useTheme, IconButton } from '@mui/material';
import Grid from '../../components/common/Grid';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  setFilters,
  clearFilters,
  filterListings,
} from '../../features/properties/propertiesSlice';
import PropertyCard from '../../components/property/PropertyCard';
import FilterSidebar from '../../components/property/FilterSidebar';
import EmptyState from '../../components/common/EmptyState';
import type { PropertyFilters } from '../../types';

export default function PropertiesPage() {
  const [params] = useSearchParams();
  const dispatch = useAppDispatch();
  const { items, filters } = useAppSelector((s) => s.properties);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [sort, setSort] = useState('newest');
  const [q, setQ] = useState(filters.q ?? '');

  useEffect(() => {
    const next: PropertyFilters = {
      location: params.get('location') ?? '',
      transaction: (params.get('transaction') as PropertyFilters['transaction']) || '',
      listingType: (params.get('listingType') as PropertyFilters['listingType']) || '',
      bhk: params.get('bhk') ? Number(params.get('bhk')) : '',
      minPrice: params.get('minPrice') ? Number(params.get('minPrice')) : '',
      maxPrice: params.get('maxPrice') ? Number(params.get('maxPrice')) : '',
    };
    dispatch(setFilters(next));
  }, [params, dispatch]);

  const results = useMemo(() => {
    let list = filterListings(
      items.filter((l) => l.status === 'active'),
      { ...filters, q },
    );
    if (sort === 'price-asc') list = [...list].sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') list = [...list].sort((a, b) => b.price - a.price);
    if (sort === 'newest')
      list = [...list].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    return list;
  }, [items, filters, q, sort]);

  const filterPanel = (
    <FilterSidebar
      filters={filters}
      onChange={(f) => dispatch(setFilters(f))}
      onClear={() => dispatch(clearFilters())}
    />
  );

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={1.5}
        mb={3}
        alignItems={{ sm: 'center' }}
      >
        <TextField
          placeholder="Search properties..."
          size="small"
          fullWidth
          value={q}
          onChange={(e) => setQ(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel>Sort</InputLabel>
          <Select label="Sort" value={sort} onChange={(e) => setSort(e.target.value)}>
            <MenuItem value="newest">Newest</MenuItem>
            <MenuItem value="price-asc">Price: Low to High</MenuItem>
            <MenuItem value="price-desc">Price: High to Low</MenuItem>
          </Select>
        </FormControl>
        {isMobile && (
          <Button
            startIcon={<FilterListIcon />}
            variant="outlined"
            onClick={() => setDrawerOpen(true)}
          >
            Filters
          </Button>
        )}
      </Stack>

      <Grid container spacing={3}>
        {!isMobile && (
          <Grid size={{ md: 3 }}>
            {filterPanel}
          </Grid>
        )}
        <Grid size={{ xs: 12, md: 9 }}>
          <Typography variant="h5" fontWeight={700} gutterBottom>
            {results.length}+ Properties
          </Typography>
          {results.length === 0 ? (
            <EmptyState
              title="No properties found"
              description="Try adjusting your filters or search location."
              actionLabel="Clear filters"
              onAction={() => {
                dispatch(clearFilters());
                setQ('');
              }}
            />
          ) : (
            <Grid container spacing={2}>
              {results.map((p) => (
                <Grid key={p.id} size={{ xs: 12, sm: 6, lg: 4 }}>
                  <PropertyCard property={p} />
                </Grid>
              ))}
            </Grid>
          )}
        </Grid>
      </Grid>

      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 300, p: 1 }}>
          <Stack direction="row" justifyContent="flex-end">
            <IconButton onClick={() => setDrawerOpen(false)}>✕</IconButton>
          </Stack>
          {filterPanel}
        </Box>
      </Drawer>
    </Container>
  );
}
