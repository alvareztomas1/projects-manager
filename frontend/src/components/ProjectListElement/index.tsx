import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  AccordionActions,
  Typography,
  ButtonGroup,
  Fab,
  Chip,
  Box,
} from '@mui/material';
import { Info } from '@mui/icons-material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { themePalette } from '../../config/theme.config';
import { ACCESS_LEVEL } from '../../constants/access-levels';
import { DeleteModal } from '../DeleteModal';
import {
  useSaveProject,
  useProjectsList,
  useDeleteProject,
  useAddUserToProject,
} from '../../hooks';
import { ProjectFormModal } from '../ProjectFormModal';
import { AddUserToProjectModal } from '../AddUserToProjectModal';
import { AddUserButton } from './AddUserButton';
import { EditProjectButton } from './EditProjectButton';
import { DeleteProjectButton } from './DeleteProjectButton';

export type ProjectProps = {
  id: string;
  title: string;
  description: string;
  accessLevel: ACCESS_LEVEL;
  expanded: string | boolean;
  handleAccordionChange: (
    panel: string,
  ) => (event: React.SyntheticEvent, isExpanded: boolean) => void;
};

export const ProjectListElement: React.FC<ProjectProps> = ({
  id,
  title,
  description,
  accessLevel,
  expanded,
  handleAccordionChange,
}) => {
  const {
    anchorAdd,
    anchorEdit,
    anchorDelete,
    openAddPopover,
    openDeletePopover,
    openEditPopover,
    handlePopoverOpen,
    handlePopoverClose,
  } = useProjectsList();
  const {
    SaveProjectModalOpen,
    formik,
    handleSaveProjectModalOpen,
    handleSaveProjectModalClose,
    loadingConfirmSaveButton,
  } = useSaveProject(title, description, id);
  const {
    openDeleteModal,
    handleConfirmDelete,
    handleDeleteModalClose,
    handleDeleteModalOpen,
    loadingConfirmDeleteButton,
  } = useDeleteProject();
  const {
    addUserToProjectModalOpen,
    handleAddUserToProjectModalClose,
    handleAddUserToProjectModalOpen,
    loadingAddUserButton,
    handleSearchOnChange,
    searchResult,
    addUserToProjectFormik,
    handleUserSelection,
  } = useAddUserToProject(id);
  return (
    <Accordion
      onChange={handleAccordionChange(id)}
      expanded={expanded === id}
      sx={{ mt: 2, mb: 2, bgcolor: themePalette.BG_2 }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel3-content"
        id="panel3-header"
      >
        <Box display={'flex'} sx={{ alignItems: 'center' }}>
          <Typography m={1} variant="h5">
            {title.split('')[0].toUpperCase() + title.slice(1)}
          </Typography>
          <Chip
            size="small"
            variant="outlined"
            label={ACCESS_LEVEL[accessLevel]}
            color={
              +accessLevel === ACCESS_LEVEL.OWNER ? 'success' : 'secondary'
            }
          />
        </Box>
      </AccordionSummary>

      <AccordionDetails>
        <Typography sx={{ wordBreak: 'break-word' }} variant="h6">
          {description.split('')[0].toUpperCase() + description.slice(1)}
        </Typography>
      </AccordionDetails>

      <AccordionActions>
        <ButtonGroup
          sx={{ alignItems: 'center', gap: 1 }}
          variant="text"
          aria-label="Basic button group"
        >
          <Fab color="info" href={`/project/${id}`} variant="extended">
            <Info sx={{ mr: 1 }} />
            More info
          </Fab>

          {+accessLevel > ACCESS_LEVEL.BASIC && (
            <>
              <AddUserButton
                anchorAdd={anchorAdd}
                openAddPopover={openAddPopover}
                handlePopoverClose={handlePopoverClose}
                handlePopoverOpen={handlePopoverOpen}
                handleAddUserToProjectModalOpen={
                  handleAddUserToProjectModalOpen
                }
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
          )}

          {+accessLevel > ACCESS_LEVEL.MAINTAINER && (
            <>
              <DeleteProjectButton
                anchorDelete={anchorDelete}
                openDeletePopover={openDeletePopover}
                handlePopoverOpen={handlePopoverOpen}
                handlePopoverClose={handlePopoverClose}
                handleDeleteModalOpen={handleDeleteModalOpen}
              />
              <DeleteModal
                msg="¿Sure you want to delete this project?"
                loading={loadingConfirmDeleteButton}
                handleConfirmDelete={() => handleConfirmDelete(id)}
                open={openDeleteModal}
                handleClose={() => handleDeleteModalClose()}
                id={id}
              />
            </>
          )}
        </ButtonGroup>
      </AccordionActions>
    </Accordion>
  );
};
