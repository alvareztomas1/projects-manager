import { DataGrid, GridColDef } from '@mui/x-data-grid';
import React from 'react';
import { themePalette } from '../../config/theme.config';
import { STATUS } from '../../constants/status';

type TasksDataGridProps = {
  rows: {
    id: string;
    number: number;
    title: string;
    description: string;
    status: STATUS;
    usersIncluded: string | string[];
  }[];
  columns: GridColDef[];
};

export const TasksDataGrid: React.FC<TasksDataGridProps> = ({
  rows,
  columns,
}) => {
  const [columnVisibilityModel, setColumnVisibilityModel] = React.useState<any>(
    {
      id: false,
    },
  );

  return (
    <DataGrid
      density="standard"
      rows={rows}
      columns={columns}
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
  );
};
