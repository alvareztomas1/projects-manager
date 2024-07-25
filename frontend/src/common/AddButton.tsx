import React from 'react';
import { Add } from '@mui/icons-material';
import { Fab, Popover, Typography } from '@mui/material';

type AddButtonProps = {
  msg: string;
  size: 'small' | 'medium' | 'large';
  anchorAdd: HTMLElement | null;
  openAddPopover: boolean;
  handlePopoverOpen: (
    event: React.MouseEvent<HTMLElement> | React.FocusEvent<HTMLElement>,
    type: 'add' | 'edit' | 'delete',
  ) => void;
  handlePopoverClose: (type: 'add' | 'edit' | 'delete') => void;
  handleModalOpen: () => void;
};

export const AddButton: React.FC<AddButtonProps> = ({
  msg,
  size,
  anchorAdd,
  openAddPopover,
  handlePopoverClose,
  handlePopoverOpen,
  handleModalOpen,
}) => {
  return (
    <>
      <Fab
        color="primary"
        size={size}
        aria-label="add"
        aria-owns={openAddPopover ? 'mouse-over-popover-add' : undefined}
        aria-haspopup="true"
        onMouseEnter={(e) => handlePopoverOpen(e, 'add')}
        onMouseLeave={() => handlePopoverClose('add')}
        onClick={() => handleModalOpen()}
      >
        <Add />
      </Fab>
      <Popover
        id="mouse-over-popover-add"
        sx={{ pointerEvents: 'none' }}
        open={openAddPopover}
        anchorEl={anchorAdd}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={() => handlePopoverClose('add')}
        disableRestoreFocus
      >
        <Typography sx={{ p: 1 }}>{msg}</Typography>
      </Popover>
    </>
  );
};
