import React from 'react';
import { IUseProjectsListHook } from '../../interfaces/custom.hooks.interface';

const useProjectsList = (): IUseProjectsListHook => {
  const [anchorAdd, setAnchorAdd] = React.useState<HTMLElement | null>(null);
  const [anchorEdit, setAnchorEdit] = React.useState<HTMLElement | null>(null);
  const [anchorDelete, setAnchorDelete] = React.useState<HTMLElement | null>(
    null,
  );
  const [modalOpen, setModalOpen] = React.useState(false);

  const handleModalOpen = () => {
    setModalOpen(true);
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };

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
    modalOpen,
    handleModalOpen,
    handleModalClose,
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

export default useProjectsList;
