import React from 'react';
import { DeleteButton } from '../../DeleteButton';
import { DeleteModal } from '../../DeleteModal';
import { useDeleteProject, useProjectsList } from '../../../hooks';

type DeleteProjectProps = {
  projectId: string;
};

export const DeleteProject: React.FC<DeleteProjectProps> = ({ projectId }) => {
  const {
    anchorDelete,
    openDeletePopover,
    handlePopoverOpen,
    handlePopoverClose,
  } = useProjectsList();

  const {
    openDeleteModal,
    handleConfirmDelete,
    handleDeleteModalClose,
    handleDeleteModalOpen,
    loadingConfirmDeleteButton,
  } = useDeleteProject();
  return (
    <>
      <DeleteButton
        msg={'Delete project'}
        anchorDelete={anchorDelete}
        openDeletePopover={openDeletePopover}
        handlePopoverOpen={handlePopoverOpen}
        handlePopoverClose={handlePopoverClose}
        handleDeleteModalOpen={handleDeleteModalOpen}
      />
      <DeleteModal
        msg="¿Sure you want to delete this project?"
        loading={loadingConfirmDeleteButton}
        handleConfirmDelete={() => handleConfirmDelete(projectId)}
        open={openDeleteModal}
        handleClose={() => handleDeleteModalClose()}
        id={projectId}
      />
    </>
  );
};
