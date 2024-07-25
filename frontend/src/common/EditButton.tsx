import React from 'react';
import { Fab, Popover, Typography } from '@mui/material';
import { Edit } from '@mui/icons-material';

type EditButtonProps = {
  msg: string;
  size: 'small' | 'medium' | 'large';
  anchorEdit: HTMLElement | null;
  openEditPopover: boolean;
  handlePopoverOpen: (
    event: React.MouseEvent<HTMLElement> | React.FocusEvent<HTMLElement>,
    type: 'add' | 'edit' | 'delete',
  ) => void;
  handlePopoverClose: (type: 'add' | 'edit' | 'delete') => void;
  handletModalOpen: () => void;
};

export const EditButton: React.FC<EditButtonProps> = ({
  msg,
  size,
  anchorEdit,
  openEditPopover,
  handlePopoverOpen,
  handlePopoverClose,
  handletModalOpen,
}) => {
  return (
    <>
      <Fab
        size={size}
        color="secondary"
        aria-label="edit"
        aria-owns={openEditPopover ? 'mouse-over-popover-edit' : undefined}
        aria-haspopup="true"
        onMouseEnter={(e) => handlePopoverOpen(e, 'edit')}
        onMouseLeave={() => handlePopoverClose('edit')}
        onClick={() => handletModalOpen()}
      >
        <Edit />
      </Fab>
      <Popover
        id="mouse-over-popover-edit"
        sx={{ pointerEvents: 'none' }}
        open={openEditPopover}
        anchorEl={anchorEdit}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={() => handlePopoverClose('edit')}
        disableRestoreFocus
      >
        <Typography sx={{ p: 1 }}>{msg}</Typography>
      </Popover>
    </>
  );
};
