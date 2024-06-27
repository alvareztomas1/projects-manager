import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  AccordionActions,
  Typography,
  ButtonGroup,
  Fab,
  Popover,
  Chip,
  Box,
} from '@mui/material';
import { Add, Delete, Edit, Info } from '@mui/icons-material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { themePalette } from '../../config/theme.config';
import { ACCESS_LEVEL } from '../../constants/access-levels';

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
            {title}
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
        <Typography variant="h6">{description}</Typography>
      </AccordionDetails>

      <AccordionActions>
        <ButtonGroup
          sx={{ alignItems: 'center', gap: 1 }}
          variant="text"
          aria-label="Basic button group"
        >
          <Fab href={`/project/${id}`} variant="extended">
            <Info sx={{ mr: 1 }} />
            More info
          </Fab>
          {+accessLevel > ACCESS_LEVEL.BASIC && (
            <>
              <Fab
                color="primary"
                aria-label="add"
                aria-owns={
                  openAddPopover ? 'mouse-over-popover-add' : undefined
                }
                aria-haspopup="true"
                onMouseEnter={(e) => handlePopoverOpen(e, 'add')}
                onMouseLeave={() => handlePopoverClose('add')}
              >
                <Add />
              </Fab>
              <Popover
                id="mouse-over-popover-add"
                sx={{ pointerEvents: 'none' }}
                open={openAddPopover}
                anchorEl={anchorAdd}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                onClose={() => handlePopoverClose('add')}
                disableRestoreFocus
              >
                <Typography sx={{ p: 1 }}>Add user to project</Typography>
              </Popover>

              <Fab
                color="secondary"
                aria-label="edit"
                aria-owns={
                  openEditPopover ? 'mouse-over-popover-edit' : undefined
                }
                aria-haspopup="true"
                onMouseEnter={(e) => handlePopoverOpen(e, 'edit')}
                onMouseLeave={() => handlePopoverClose('edit')}
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
                <Typography sx={{ p: 1 }}>Edit project</Typography>
              </Popover>
            </>
          )}

          {+accessLevel > ACCESS_LEVEL.MAINTAINER && (
            <>
              <Fab
                color="warning"
                aria-label="delete"
                aria-owns={
                  openDeletePopover ? 'mouse-over-popover-delete' : undefined
                }
                aria-haspopup="true"
                onMouseEnter={(e) => handlePopoverOpen(e, 'delete')}
                onMouseLeave={() => handlePopoverClose('delete')}
              >
                <Delete />
              </Fab>
              <Popover
                id="mouse-over-popover-delete"
                sx={{ pointerEvents: 'none' }}
                open={openDeletePopover}
                anchorEl={anchorDelete}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                onClose={() => handlePopoverClose('delete')}
                disableRestoreFocus
              >
                <Typography sx={{ p: 1 }}>Delete project</Typography>
              </Popover>
            </>
          )}
        </ButtonGroup>
      </AccordionActions>
    </Accordion>
  );
};