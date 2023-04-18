import { useEditTask, useDeleteTask } from './reactQueryCustomHooks';

const SingleItem = ({ item }) => {
  const { editTask } = useEditTask();
  const { deleteTask } = useDeleteTask();

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
