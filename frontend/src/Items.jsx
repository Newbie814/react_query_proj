import SingleItem from './SingleItem';
import { useQuery } from '@tanstack/react-query';
import customFetch from './utils';
import { useGetTasks } from './reactQueryCustomHooks';

const Items = () => {
  const { isLoading, data, error } = useGetTasks();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <h2 style={{ marginTop: '2rem', color: 'red' }}>
        {`${error.message}:  `}
        <br />
        <span style={{ color: 'black', marginTop: '2rem' }}>
          {error.response.data}
        </span>
      </h2>
    );
  }

  return (
    <div className='items'>
      {data.data.taskList.map((item) => {
        return <SingleItem key={item.id} item={item} />;
      })}
    </div>
  );
};
export default Items;
