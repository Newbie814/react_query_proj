import { useMutation, useQueryClient } from '@tanstack/react-query';
import customFetch from './utils';

const SingleItem = ({ item }) => {
  const queryClient = useQueryClient();
  const { mutate: editTask } = useMutation({
    mutationFn: ({ taskId, isDone }) =>
      customFetch.patch(`/${taskId}`, { isDone }),
    onSuccess: () => {
      queryClient.invalidateQueries('tasks');
    },
    onError: (error) => {
      toast.error(error.response.data.msg);
    },
  });

  const { mutate: deleteTask } = useMutation({
    mutationFn: (taskId) => customFetch.delete(`/${taskId}`),
    onSuccess: () => {
      queryClient.invalidateQueries('tasks');
    },
    onError: (error) => {
      toast.error(error.response.data.msg);
    },
  });

  const handleIsTaskDone = () => {
    editTask({ taskId: item.id, isDone: !item.isDone });
  };

  const handleDeleteTask = () => {
    deleteTask(item.id);
  };

  return (
    <div className='single-item'>
      <input
        type='checkbox'
        checked={item.isDone}
        onChange={handleIsTaskDone}
      />
      <p
        style={{
          textTransform: 'capitalize',
          textDecoration: item.isDone && 'line-through',
        }}
      >
        {item.title}
      </p>
      <button
        className='btn remove-btn'
        type='button'
        onClick={handleDeleteTask}
      >
        delete
      </button>
    </div>
  );
};
export default SingleItem;
