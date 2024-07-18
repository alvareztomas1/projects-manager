import React from 'react';
import { usePopOvers } from '../../hooks';
import { DeleteButton } from '../DeleteButton';

export const DeleteTask: React.FC<any> = ({ handleOpen }) => {
  const {
    anchorDelete,
    openDeletePopover,
    handlePopoverOpen,
    handlePopoverClose,
  } = usePopOvers();

  return (
    <DeleteButton
      msg={'Delete task'}
      size="small"
      anchorDelete={anchorDelete}
      openDeletePopover={openDeletePopover}
      handlePopoverOpen={handlePopoverOpen}
      handlePopoverClose={handlePopoverClose}
      handleDeleteModalOpen={handleOpen}
    />
  );
};
