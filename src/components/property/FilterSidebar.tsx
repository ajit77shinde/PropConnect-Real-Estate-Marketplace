import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Stack,
  Divider,
} from '@mui/material';
import type { PropertyFilters } from '../../types';
import {
  LISTING_TYPES,
  TRANSACTIONS,
  BHK_OPTIONS,
  FURNISHING_OPTIONS,
} from '../../utils/constants';

interface Props {
  filters: PropertyFilters;
  onChange: (filters: PropertyFilters) => void;
  onClear: () => void;
}

export default function FilterSidebar({ filters, onChange, onClear }: Props) {
  const set = <K extends keyof PropertyFilters>(key: K, value: PropertyFilters[K]) =>
    onChange({ ...filters, [key]: value });

  return (
    <Box
      sx={{
        p: 2.5,
        bgcolor: 'background.paper',
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
        position: { md: 'sticky' },
        top: { md: 88 },
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">Filters</Typography>
        <Button size="small" onClick={onClear}>
          Clear
        </Button>
      </Stack>
      <Divider sx={{ mb: 2 }} />
      <Stack spacing={2}>
        <TextField
          label="Location"
          size="small"
          fullWidth
          value={filters.location ?? ''}
          onChange={(e) => set('location', e.target.value)}
          placeholder="Kalyan, Thane..."
        />
        <FormControl size="small" fullWidth>
          <InputLabel>Buy / Rent</InputLabel>
          <Select
            label="Buy / Rent"
            value={filters.transaction ?? ''}
            onChange={(e) =>
              set('transaction', e.target.value as PropertyFilters['transaction'])
            }
          >
            <MenuItem value="">All</MenuItem>
            {TRANSACTIONS.map((t) => (
              <MenuItem key={t.value} value={t.value}>
                {t.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl size="small" fullWidth>
          <InputLabel>Property Type</InputLabel>
          <Select
            label="Property Type"
            value={filters.listingType ?? ''}
            onChange={(e) =>
              set('listingType', e.target.value as PropertyFilters['listingType'])
            }
          >
            <MenuItem value="">All</MenuItem>
            {LISTING_TYPES.map((t) => (
              <MenuItem key={t.value} value={t.value}>
                {t.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl size="small" fullWidth>
          <InputLabel>BHK</InputLabel>
          <Select
            label="BHK"
            value={filters.bhk ?? ''}
            onChange={(e) =>
              set('bhk', e.target.value === '' ? '' : Number(e.target.value))
            }
          >
            <MenuItem value="">All</MenuItem>
            {BHK_OPTIONS.map((b) => (
              <MenuItem key={b} value={b}>
                {b} BHK
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Stack direction="row" spacing={1}>
          <TextField
            label="Min Price"
            size="small"
            type="number"
            value={filters.minPrice ?? ''}
            onChange={(e) =>
              set('minPrice', e.target.value === '' ? '' : Number(e.target.value))
            }
          />
          <TextField
            label="Max Price"
            size="small"
            type="number"
            value={filters.maxPrice ?? ''}
            onChange={(e) =>
              set('maxPrice', e.target.value === '' ? '' : Number(e.target.value))
            }
          />
        </Stack>
        <Stack direction="row" spacing={1}>
          <TextField
            label="Min Area"
            size="small"
            type="number"
            value={filters.minArea ?? ''}
            onChange={(e) =>
              set('minArea', e.target.value === '' ? '' : Number(e.target.value))
            }
          />
          <TextField
            label="Max Area"
            size="small"
            type="number"
            value={filters.maxArea ?? ''}
            onChange={(e) =>
              set('maxArea', e.target.value === '' ? '' : Number(e.target.value))
            }
          />
        </Stack>
        <FormControl size="small" fullWidth>
          <InputLabel>Furnishing</InputLabel>
          <Select
            label="Furnishing"
            value={filters.furnishing ?? ''}
            onChange={(e) =>
              set('furnishing', e.target.value as PropertyFilters['furnishing'])
            }
          >
            <MenuItem value="">All</MenuItem>
            {FURNISHING_OPTIONS.map((f) => (
              <MenuItem key={f.value} value={f.value}>
                {f.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl size="small" fullWidth>
          <InputLabel>Possession</InputLabel>
          <Select
            label="Possession"
            value={filters.possession ?? ''}
            onChange={(e) =>
              set('possession', e.target.value as PropertyFilters['possession'])
            }
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="ready">Ready to Move</MenuItem>
            <MenuItem value="under-construction">Under Construction</MenuItem>
          </Select>
        </FormControl>
        <FormControlLabel
          control={
            <Checkbox
              checked={filters.parking === true}
              onChange={(e) => set('parking', e.target.checked ? true : '')}
            />
          }
          label="Parking available"
        />
      </Stack>
    </Box>
  );
}
