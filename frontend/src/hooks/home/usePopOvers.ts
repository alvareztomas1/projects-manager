import React from 'react';
import { IUsePopOversHook } from '../../interfaces/custom.hooks.interface';

const usePopOvers = (): IUsePopOversHook => {
  const [anchorAdd, setAnchorAdd] = React.useState<HTMLElement | null>(null);
  const [anchorEdit, setAnchorEdit] = React.useState<HTMLElement | null>(null);
  const [anchorDelete, setAnchorDelete] = React.useState<HTMLElement | null>(
    null,
  );

  const handlePopoverOpen = (
    event: React.MouseEvent<HTMLElement> | React.FocusEvent<HTMLElement>,
    type: 'add' | 'edit' | 'delete',
  ) => {
    if (type === 'add') {
      setAnchorAdd(event.currentTarget);
    } else if (type === 'edit') {
      setAnchorEdit(event.currentTarget);
    } else if (type === 'delete') {
      setAnchorDelete(event.currentTarget);
    }
  };

  const handlePopoverClose = (type: 'add' | 'edit' | 'delete') => {
    if (type === 'add') {
      setAnchorAdd(null);
    } else if (type === 'edit') {
      setAnchorEdit(null);
    } else if (type === 'delete') {
      setAnchorDelete(null);
    }
  };
  const openAddPopover = Boolean(anchorAdd);
  const openEditPopover = Boolean(anchorEdit);
  const openDeletePopover = Boolean(anchorDelete);

  return {
    anchorAdd,
    anchorEdit,
    anchorDelete,
    openAddPopover,
    openEditPopover,
    openDeletePopover,
    handlePopoverOpen,
    handlePopoverClose,
  };
};

export default usePopOvers;
