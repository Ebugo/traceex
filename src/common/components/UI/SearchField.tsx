import SearchIcon from '@mui/icons-material/Search';
import { TextField, InputAdornment } from '@mui/material';
import { useRouter } from 'next/router';
import { ChangeEvent, FC } from 'react';

interface SearchFieldProps {
  placeholder?: string;
  backgroundColor?: string;
  height?: string;
  fullWidth?: boolean;
}

const SearchField: FC<SearchFieldProps> = ({
  placeholder = 'Search',
  backgroundColor = '#F0F0F0',
  height = 'unset',
  fullWidth = false,
}) => {
  const router = useRouter();
  const { query } = router;

  const searchString = (query?.search || '') as string;

  const searchHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value;

    searchValue ? (query.search = searchValue) : delete query.search;

    router.push({
      query: {
        ...query,
      },
    });
  };

  return (
    <TextField
      variant="outlined"
      autoComplete="off"
      placeholder={placeholder}
      fullWidth={fullWidth}
      value={searchString}
      onChange={searchHandler}
      InputProps={{
        startAdornment: (
          <InputAdornment position="end">
            <SearchIcon
              sx={{
                fontSize: '1.125rem',
              }}
            />
          </InputAdornment>
        ),
        style: {
          color: 'text.secondary',
          minWidth: '350px',
          height,
          backgroundColor,
        },
      }}
    />
  );
};

export default SearchField;
