import { DataGrid, GridColDef } from '@mui/x-data-grid';
import React from 'react';
import { themePalette } from '../../config/theme.config';
import { STATUS } from '../../constants/status';
import { useDeleteTask } from '../../hooks';
import { DeleteModal } from '../DeleteModal';
import { TaskOperationsButtons } from '../TaskOperationsButtons';
import { Chip } from '@mui/material';
import { TaskData } from '../../types/task.type';

type TasksDataGridProps = {
  tasks: TaskData[];
};

export const TasksDataGrid: React.FC<TasksDataGridProps> = ({ tasks }) => {
  const [columnVisibilityModel, setColumnVisibilityModel] = React.useState<any>(
    {
      id: false,
    },
  );
  const tableColumns: GridColDef[] = [
    {
      field: 'id',
      hideable: false,
    },
    { field: 'number', headerName: 'N°', width: 100, headerAlign: 'center' },

    { field: 'title', headerName: 'Title', width: 300, headerAlign: 'center' },
    {
      field: 'description',
      headerName: 'Description',
      width: 500,
      headerAlign: 'center',
    },
  ];
  const tableRows = tasks?.map((task, index) => ({
    id: task.id,
    number: index + 1,
    title: task.title,
    description: task.description,
    status: task.status,
    usersIncluded: task.usersIncluded.length ? task.usersIncluded.length : '-',
  }));
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
      <DataGrid
        density="standard"
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
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        sx={{ backgroundColor: themePalette.BG_2 }}
        pageSizeOptions={[5, 10]}
        columnVisibilityModel={columnVisibilityModel}
        onColumnVisibilityModelChange={(newModel) =>
          setColumnVisibilityModel(newModel)
        }
      />
      <DeleteModal
        loading={loadingConfirmDeleteButton}
        open={deleteModalOpen}
        id={taskToDeleteId}
        handleConfirmDelete={() => handleDelete(taskToDeleteId)}
        handleClose={() => handleDeleteModalClose()}
        msg={'Sure you want to delete?'}
      />
    </>
  );
};
