import React from 'react';
import { useAddUserToProject, usePopOvers } from '../../../hooks';
import { AddUserToProjectModal } from '../../AddUserToProjectModal';
import { AddButton } from '../../../common/AddButton';

type AddUserToProjectType = {
  projectId: string;
};

export const AddUserToProject: React.FC<AddUserToProjectType> = ({
  projectId,
}) => {
  const { anchorAdd, openAddPopover, handlePopoverOpen, handlePopoverClose } =
    usePopOvers();
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
      <AddButton
        msg={'Add user to project'}
        size="medium"
        anchorAdd={anchorAdd}
        openAddPopover={openAddPopover}
        handlePopoverClose={handlePopoverClose}
        handlePopoverOpen={handlePopoverOpen}
        handleModalOpen={handleAddUserToProjectModalOpen}
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
