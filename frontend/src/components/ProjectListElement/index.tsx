import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  AccordionActions,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { themePalette } from '../../config/theme.config';
import { ACCESS_LEVEL } from '../../constants/access-levels';
import { ProjectTitle } from './ProjectTitle';
import { ProjectDescription } from './ProjectDescription';
import OperationButtons from './OperationButtons';

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
        <ProjectTitle title={title} accessLevel={accessLevel} />
      </AccordionSummary>

      <AccordionDetails>
        <ProjectDescription description={description} />
      </AccordionDetails>

      <AccordionActions>
        <OperationButtons
          accessLevel={accessLevel}
          id={id}
          title={title}
          description={description}
        />
      </AccordionActions>
    </Accordion>
  );
};
