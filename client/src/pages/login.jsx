import react,{useState} from 'react';
// import {link,useNavigate} from 'react-router-dom';
import axios from 'axios';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

const LoginPage = ({onLogin}) => {
  const [activeTab, setActiveTab] = useState('user'); // Default to 'user'

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
  };

  const renderForm = () => {
    if (activeTab === 'user') {
      return (
        <form className="w-full space-y-4">
          <h2 className="text-xl font-bold text-center">User Login</h2>
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            Login as User
          </button>
          {/* Register Link */}
          <p className="text-center mt-4 text-gray-600">
            Are you a new user?{' '}
            <Link to="/usersignup" className="text-blue-500 hover:underline">
              Register here
            </Link>
          </p>
        </form>
      );
    } else if (activeTab === 'farmer') {
      return (
        <form className="w-full space-y-4">
          <h2 className="text-xl font-bold text-center">Farmer Login</h2>
          <div>
            <label className="block text-gray-700">Mobile Number</label>
            <input
              type="text"
              placeholder="Enter your mobile number"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-green-300"
            />
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-green-300"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600"
          >
            Login as Farmer
          </button>
          {/* Register Link */}
          <p className="text-center mt-4 text-gray-600">
            Are you a new farmer?{' '}
            <Link to="/farmersignup" className="text-green-500 hover:underline">
              Register here
            </Link>
          </p>
        </form>
      );
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        {/* Toggler */}
        <div className="flex w-full border-b-2 border-gray-200">
          <button
            className={`w-1/2 py-2 text-center font-medium ${
              activeTab === 'user'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700'
            }`}
            onClick={() => handleTabSwitch('user')}
          >
            User
          </button>
          <button
            className={`w-1/2 py-2 text-center font-medium ${
              activeTab === 'farmer'
                ? 'bg-green-500 text-white'
                : 'bg-gray-100 text-gray-700'
            }`}
            onClick={() => handleTabSwitch('farmer')}
          >
            Farmer
          </button>
        </div>

        {/* Login Form */}
        <div className="mt-6">{renderForm()}</div>
      </div>
    </div>
  );
};

export default LoginPage;

