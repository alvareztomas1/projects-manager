import React from 'react';
import { useFormik } from 'formik';
import { STATUS } from '../../constants/status';
import { IUseSaveTask } from '../../interfaces/custom.hooks.interface';
import { AddTask } from '../../types/task.type';
import { SaveTaskValidate } from '../../utils/validateForm';
import { useNavigate, useParams } from 'react-router-dom';
import { useNotification } from '../../context/notification.context';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { tasks } from '../../api/tasks.api';
import { getTasksThunk } from '../../redux/thunks/getTasks.thunk';

const useSaveTask = (
  initialTitle: string = '',
  initialDescription: string = '',
  taskId: string | null = null,
): IUseSaveTask => {
  const { accessToken } = useAppSelector((state) => state.authReducer);
  const navigate = useNavigate();
  const { getSuccess, getInfo, getError } = useNotification();
  const { projectId } = useParams();
  const [saveTaskModalOpen, setSaveTaskModalOpen] = React.useState(false);
  const [loadingSaveTaskButton, setLoadingSaveTaskButton] =
    React.useState(false);
  const dispatch = useAppDispatch();

  const handleSaveTaskModalOpen = () => {
    setSaveTaskModalOpen(true);
  };
  const handleSaveTaskModalClose = () => {
    setSaveTaskModalOpen(false);
  };

  const addTaskFormik = useFormik<AddTask>({
    initialValues: {
      title: initialTitle,
      description: initialDescription,
      status: STATUS.PENDING,
    },
    validationSchema: SaveTaskValidate,
    onSubmit: async (values) => {
      setLoadingSaveTaskButton(true);

      try {
        if (!taskId) {
          await tasks.create(projectId!, values, accessToken!);
          getSuccess('! Task created successfully !');
        } else {
          await tasks.edit(taskId, values, accessToken!);
          getInfo('! Task edited successfully !');
        }

        await dispatch(
          getTasksThunk({
            projectId: projectId!,
            accessToken: accessToken!,
          }),
        );
        navigate(`/project/tasks/${projectId}`);
      } catch (error) {
        getError((error as Error).message);
        setLoadingSaveTaskButton(false);
      }
    },
  });

  return {
    saveTaskModalOpen,
    handleSaveTaskModalOpen,
    handleSaveTaskModalClose,
    loadingSaveTaskButton,
    addTaskFormik,
  };
};

export default useSaveTask;
