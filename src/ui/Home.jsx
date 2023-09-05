import { useSelector } from 'react-redux';
import CreateUser from '../features/user/CreateUser';
import Button from './Button';

function Home() {
  const username = useSelector((state) => state.user.username);

  return (
    <div className="m-8 text-center md:my-10">
      <h1 className="mb-4 text-3xl font-semibold ">
        The best pizza.
        <br />
        <span className="text-yellow-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>

      {username === '' ? (
        <CreateUser />
      ) : (
        <Button to="menu" type="primary">
          Continnue Ordering {username}
        </Button>
      )}
    </div>
  );
}

export default Home;
