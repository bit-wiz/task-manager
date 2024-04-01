import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Tasks from '../components/Tasks';
import MainLayout from '../layouts/MainLayout';

const Home = () => {

  const authState = useSelector(state => state.authReducer);
  const { isLoggedIn } = authState;

  useEffect(() => {
    document.title = authState.isLoggedIn ? `${authState.user.name}'s tasks` : "Task Manager";
  }, [authState]);



  return (
    <>
      <MainLayout>
        {!isLoggedIn ? (
        <div className='bg-blue-500 text-white min-h-screen flex flex-col items-center justify-center'>
          <div className='py-8 flex flex-col items-center justify-center'>
            <h1 className='text-4xl font-bold mb-6'>Welcome to Task Manager App</h1>
            <Link to="/signup" className='text-xl flex items-center justify-center bg-white text-primary rounded-full px-6 py-3 hover:bg-opacity-80 transition duration-300 ease-in-out'>
              <span className='mr-2'>Join now to manage your tasks</span>
              <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
        </div>
        ) : (
          <>
            <h1 className='text-lg mt-8 mx-8 border-b border-b-gray-300'>Welcome to task manager, {authState.user.name}</h1>
            <Tasks />
          </>
        )}
      </MainLayout>
    </>
  )
}

export default Home