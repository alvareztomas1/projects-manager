import { Grid } from '@mui/material';
import { EditTask } from '../EditTask';
import { DeleteTask } from '../DeleteTask';
import { STATUS } from '../../constants/status';

type TaskOperationButtonsProps = {
  taskId: string;
  taskTitle: string;
  taskDescription: string;
  taskStatus: STATUS;
  handleDeleteModalOpen: () => void;
};

export const TaskOperationsButtons: React.FC<TaskOperationButtonsProps> = ({
  taskId,
  taskTitle,
  taskDescription,
  taskStatus,
  handleDeleteModalOpen,
}) => {
  return (
    <Grid container spacing={1}>
      <Grid item></Grid>
      <Grid item>
        <EditTask
          taskId={taskId}
          taskTitle={taskTitle}
          taskDescription={taskDescription}
          taskStatus={taskStatus}
        />
      </Grid>
      <Grid item>
        <DeleteTask handleOpen={handleDeleteModalOpen} />
      </Grid>
    </Grid>
  );
};
