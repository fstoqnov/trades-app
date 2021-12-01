import React, { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import { Dropdown } from "../StyledComponents";

const FilterDropdown = ({
  filterOptions,
  handleClick,
  selected,
  selectAllText,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleSelect = (filterOption) => {
    setAnchorEl(null);
    handleClick(filterOption);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <div>
      <Dropdown
        id="dropdown-button"
        data-testid="dropdown-button-test-id"
        aria-controls="dropdown-menu"
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleOpen}
      >
        <React.Fragment>
          {selected}
          <KeyboardArrowDownIcon style={{ fontSize: 10 }} />
        </React.Fragment>
      </Dropdown>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {filterOptions.map((filterOption) => (
          <MenuItem
            key={filterOption}
            onClick={() => handleSelect && handleSelect(filterOption)}
          >
            {filterOption}
          </MenuItem>
        ))}
        <MenuItem
          key={selectAllText}
          onClick={() => handleSelect && handleSelect(selectAllText)}
        >
          {selectAllText}
        </MenuItem>
      </Menu>
    </div>
  );
};

export default FilterDropdown;
