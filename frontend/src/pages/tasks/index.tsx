import React from 'react';
import { Box, Button, Chip } from '@mui/material';
import { STATUS } from '../../constants/status';
import { AddTaskToProject, TasksDataGrid } from '../../components';
import { LoadingSpinner } from '../../common/LoadingSpinner';
import { useTaskPage } from '../../hooks';
import { ACCESS_LEVEL } from '../../constants/access-levels';
export const TasksPage: React.FC<{}> = () => {
  const { tableColumns, tableRows, projectId, error, loading, accessLevel } =

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
                    <div>
                      <Button color="primary">ADD USER</Button>
                      <Button color="info">EDIT</Button>
                      <Button
                        color="error"
                      >
                        DELETE
                      </Button>
                    </div>
                  ),
                },
              ]}
              rows={tableRows}
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
