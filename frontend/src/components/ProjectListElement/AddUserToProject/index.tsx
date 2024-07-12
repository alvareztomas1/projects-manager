import React from 'react';
import { useAddUserToProject, useProjectsList } from '../../../hooks';
import { AddUserButton } from './AddUserButton';
import { AddUserToProjectModal } from '../../AddUserToProjectModal';

type AddUserToProjectType = {
  projectId: string;
};

export const AddUserToProject: React.FC<AddUserToProjectType> = ({
  projectId,
}) => {
  const { anchorAdd, openAddPopover, handlePopoverOpen, handlePopoverClose } =
    useProjectsList();
  const {
    addUserToProjectModalOpen,
    handleAddUserToProjectModalClose,
    handleAddUserToProjectModalOpen,
    loadingAddUserButton,
    handleSearchOnChange,
    searchResult,
    addUserToProjectFormik,
    handleUserSelection,
  } = useAddUserToProject(projectId);
  return (
    <>
      <AddUserButton
        anchorAdd={anchorAdd}
        openAddPopover={openAddPopover}
        handlePopoverClose={handlePopoverClose}
        handlePopoverOpen={handlePopoverOpen}
        handleAddUserToProjectModalOpen={handleAddUserToProjectModalOpen}
      />
      <AddUserToProjectModal
        loadingAddUserButton={loadingAddUserButton}
        openModal={addUserToProjectModalOpen}
        handleClose={handleAddUserToProjectModalClose}
        handleSearchOnChange={handleSearchOnChange}
        options={searchResult?.map((user) => ({
          id: user.id,
          label: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
        }))}
        formik={addUserToProjectFormik}
        handleUserSelection={(e: any, newValue: any) =>
          handleUserSelection(e, newValue)
        }
      />
    </>
  );
};
