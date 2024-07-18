import React from 'react';
import { ProjectFormModal } from '../../ProjectFormModal';
import { usePopOvers, useSaveProject } from '../../../hooks';
import { EditButton } from '../../EditButton';

type EditProjectProps = {
  title: string;
  description: string;
  projectId: string;
};

export const EditProject: React.FC<EditProjectProps> = ({
  title,
  description,
  projectId,
}) => {
  const { anchorEdit, openEditPopover, handlePopoverOpen, handlePopoverClose } =
    usePopOvers();
  const {
    SaveProjectModalOpen,
    formik,
    handleSaveProjectModalOpen,
    handleSaveProjectModalClose,
    loadingConfirmSaveButton,
  } = useSaveProject(title, description, projectId);
  return (
    <>
      <EditButton
        msg={'Edit project'}
        size="medium"
        anchorEdit={anchorEdit}
        openEditPopover={openEditPopover}
        handlePopoverOpen={handlePopoverOpen}
        handlePopoverClose={handlePopoverClose}
        handleSaveProjectModalOpen={handleSaveProjectModalOpen}
      />
      <ProjectFormModal
        loadingButton={loadingConfirmSaveButton}
        msg={'EDIT PROJECT'}
        formik={formik}
        open={SaveProjectModalOpen}
        handleClose={() => handleSaveProjectModalClose()}
      />
    </>
  );
};
