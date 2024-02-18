import { ReactNode, useState } from "react";

import { Popover, Stack } from "@mui/material";
import { PiDotsThreeBold } from "react-icons/pi";

const ActionMenu = ({ actionList }: { actionList?: ReactNode }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleOpenActionMenu = (event: any) => setAnchorEl(event.currentTarget);
  const handleCloseActionMenu = () => setAnchorEl(null);

  const open = Boolean(anchorEl);
  const id = open ? "action-menu-popover" : undefined;

  return (
    <>
      <PiDotsThreeBold
        size={24}
        color="var(--secondary)"
        cursor="pointer"
        onClick={handleOpenActionMenu}
      />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleCloseActionMenu}
        sx={{
          "& .MuiPaper-root": {
            boxShadow: "0px 2px 12px 0px rgba(30, 32, 32, 0.12)",
            borderRadius: "8px",
            border: "1px solid var(--border-color)",
          },
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {/* Action components */}
        <Stack direction="column" padding="12px" gap={0.5}>
          {actionList}
        </Stack>
      </Popover>
    </>
  );
};

export default ActionMenu;
