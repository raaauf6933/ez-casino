import * as React from "react";
import { TextField, Box } from "@mui/material";

interface SearchBarProps {
  value: string;
  setValue: (data: string) => void;
  label: string;
}

const SearchBar: React.FC<SearchBarProps> = props => {
  const { setValue, value, label } = props;
  return (
    <Box padding={2}>
      <TextField
        fullWidth
        onChange={e => setValue(e.target.value)}
        value={value}
        label={label}
      />
    </Box>
  );
};

export default SearchBar;
