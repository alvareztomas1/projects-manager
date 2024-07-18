import React from 'react';
import { Box, Button, Chip, Grid } from '@mui/material';
import { STATUS } from '../../constants/status';
import {
  AddTaskToProject,
  DeleteModal,
  TaskOperationsButtons,
  TasksDataGrid,
} from '../../components';
import { LoadingSpinner } from '../../common/LoadingSpinner';
import { useDeleteTask, useTaskPage } from '../../hooks';
import { ACCESS_LEVEL } from '../../constants/access-levels';

export const TasksPage: React.FC<{}> = () => {
  const { tableColumns, tableRows, projectId, error, loading, accessLevel } =
    useTaskPage();
  const {
    deleteModalOpen,
    taskToDeleteId,
    handleDeleteModalClose,
    handleDeleteModalOpen,
    handleDelete,
    loadingConfirmDeleteButton,
  } = useDeleteTask();

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        /* TODO: DISPLAY  ERROR  */
        <></>
      ) : (
        <>
          <div
            style={{
              height: 400,
              width: '100%',
              padding: 40,
            }}
          >
            {accessLevel! > ACCESS_LEVEL.BASIC && <AddTaskToProject />}

            <TasksDataGrid
              columns={[
                ...tableColumns,
                {
                  field: 'status',
                  headerName: 'Status',
                  width: 125,
                  headerAlign: 'center',
                  renderCell: (params) => (
                    <div>
                      <Chip
                        color={
                          params.row.status === STATUS.COMPLETE
                            ? 'success'
                            : params.row.status === STATUS.IN_PROGRESS
                              ? 'warning'
                              : 'primary'
                        }
                        size="small"
                        label={params.row.status.replace('_', ' ')}
                        variant="outlined"
                      />
                    </div>
                  ),
                },
                {
                  field: 'usersIncluded',
                  headerName: 'Users',
                  headerAlign: 'center',
                },
                {
                  field: 'operations',
                  headerName: 'Operations',
                  width: 250,
                  sortable: false,
                  filterable: false,
                  headerAlign: 'center',
                  renderCell: (params) => (
                    <TaskOperationsButtons
                      taskId={params.row.id}
                      taskTitle={params.row.title}
                      taskDescription={params.row.description}
                      taskStatus={params.row.status}
                      handleDeleteModalOpen={() =>
                        handleDeleteModalOpen(params.row.id)
                      }
                    />
                  ),
                },
              ]}
              rows={tableRows}
            />

            <DeleteModal
              loading={loadingConfirmDeleteButton}
              open={deleteModalOpen}
              id={taskToDeleteId}
              handleConfirmDelete={() => handleDelete(taskToDeleteId)}
              handleClose={() => handleDeleteModalClose()}
              msg={'Sure you want to delete?'}
            />

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
        </>
      )}
    </>
  );
};
