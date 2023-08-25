import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from './Pages/Home';
import UserAuth from './Pages/UserAuth';
import MainHome from './Pages/MainHome';
import { fetchUser } from './Redux/user/userAction';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchBuckets } from './Redux/buckets/bucketAction';
import History from './Pages/History';
import { fetchHistory } from './Redux/history/historyAction';
import { Toaster } from 'react-hot-toast';


function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      dispatch(fetchUser());
      dispatch(fetchBuckets());
      dispatch(fetchHistory());
    }
  }, [])
  return (
    <>
      <Toaster />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<MainHome />} />
          <Route path="/auth" element={<UserAuth />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </Router>

    </>
  );
}

export default App;
