import React from 'react';
import { Fab, Popover, Typography } from '@mui/material';
import { Delete } from '@mui/icons-material';

type DeleteButtonProps = {
  msg: string;
  anchorDelete: HTMLElement | null;
  openDeletePopover: boolean;
  handlePopoverOpen: (
    event: React.MouseEvent<HTMLElement> | React.FocusEvent<HTMLElement>,
    type: 'add' | 'edit' | 'delete',
  ) => void;
  handlePopoverClose: (type: 'add' | 'edit' | 'delete') => void;
  handleDeleteModalOpen: () => void;
};

export const DeleteButton: React.FC<DeleteButtonProps> = ({
  msg,
  anchorDelete,
  openDeletePopover,
  handlePopoverOpen,
  handlePopoverClose,
  handleDeleteModalOpen,
}) => {
  return (
    <>
      <Fab
        size="small"
        color="error"
        aria-label="delete"
        aria-owns={openDeletePopover ? 'mouse-over-popover-delete' : undefined}
        aria-haspopup="true"
        onMouseEnter={(e) => handlePopoverOpen(e, 'delete')}
        onMouseLeave={() => handlePopoverClose('delete')}
        onClick={() => handleDeleteModalOpen()}
      >
        <Delete />
      </Fab>
      <Popover
        id="mouse-over-popover-delete"
        sx={{ pointerEvents: 'none' }}
        open={openDeletePopover}
        anchorEl={anchorDelete}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={() => handlePopoverClose('delete')}
        disableRestoreFocus
      >
        <Typography sx={{ p: 1 }}>{msg}</Typography>
      </Popover>
    </>
  );
};
