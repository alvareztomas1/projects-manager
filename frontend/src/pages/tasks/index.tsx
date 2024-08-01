import React from 'react';
import { Box, Button } from '@mui/material';
import { AddTaskToProject, TasksDataGrid } from '../../components';
import { LoadingSpinner } from '../../common/LoadingSpinner';
import { useTaskPage } from '../../hooks';
import { ACCESS_LEVEL } from '../../constants/access-levels';

export const TasksPage: React.FC<{}> = () => {
  const { tasks, projectId, error, loading, accessLevel } = useTaskPage();

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div
          style={{
            height: 400,
            width: '100%',
            padding: 40,
          }}
        >
          {accessLevel! > ACCESS_LEVEL.BASIC && <AddTaskToProject />}
          {error ? (
            /* TODO: DISPLAY  ERROR  */
            <></>
          ) : (
            <TasksDataGrid tasks={tasks} />
          )}
          <Box m={1} display={'flex'} justifyContent={'center'}>
            <Button
              href={`/project/${projectId}`}
              sx={{ fontWeight: 'bold' }}
              variant="contained"
            >
              BACK
            </Button>
          </Box>
        </div>
      )}
    </>
  );
};
