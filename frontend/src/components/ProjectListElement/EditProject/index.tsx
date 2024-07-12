import React from 'react';
import { EditProjectButton } from './EditProjectButton';
import { ProjectFormModal } from '../../ProjectFormModal';
import { useProjectsList, useSaveProject } from '../../../hooks';

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
    useProjectsList();
  const {
    SaveProjectModalOpen,
    formik,
    handleSaveProjectModalOpen,
    handleSaveProjectModalClose,
    loadingConfirmSaveButton,
  } = useSaveProject(title, description, projectId);
  return (
    <>
      <EditProjectButton
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
