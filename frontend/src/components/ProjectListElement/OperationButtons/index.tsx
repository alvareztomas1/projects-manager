import { ButtonGroup } from '@mui/material';
import React from 'react';
import { MoreInfoButton } from '../../MoreInfoButton';
import { AddUserToProject } from '../AddUserToProject';
import { EditProject } from '../EditProject';
import { ACCESS_LEVEL } from '../../../constants/access-levels';
import { DeleteProject } from '../DeleteProject';

type OperationButtonsProps = {
  accessLevel: ACCESS_LEVEL;
  id: string;
  title: string;
  description: string;
};

const OperationButtons: React.FC<OperationButtonsProps> = ({
  accessLevel,
  id,
  title,
  description,
}) => {
  return (
    <ButtonGroup
      sx={{ alignItems: 'center', gap: 1 }}
      variant="text"
      aria-label="Basic button group"
    >
      <MoreInfoButton projectId={id} size="large" />

      {+accessLevel > ACCESS_LEVEL.BASIC && (
        <>
          <AddUserToProject projectId={id} />

          <EditProject projectId={id} title={title} description={description} />
        </>
      )}

      {+accessLevel > ACCESS_LEVEL.MAINTAINER && (
        <DeleteProject projectId={id} />
      )}
    </ButtonGroup>
  );
};

export default OperationButtons;
