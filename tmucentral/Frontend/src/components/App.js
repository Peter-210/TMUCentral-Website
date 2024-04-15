
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';
import Register from './Register';
import AdDisplayCard from './AdDisplayCard';
import NavBar from './NavBar';
import { DEFAULT_MIN_BREAKPOINT } from 'react-bootstrap/esm/ThemeProvider';
import PostAd from './PostAd';
import EditAd from './EditAd';
import Login from './Login';
import AdminDashboard from './AdminDashboard';
import PrivateRoute from './PrivateRoute';
import { AuthProvider } from "../contexts/AuthContext"
import ForgotPassword from './ForgotPassword';
import MyAdDisplayCard from './MyAdDisplayCard';
import Footer from './Footer';
import SearchResult from './SearchResult';
import AdminPrivateRoute from './AdminPrivateRoute';
import AdPage from './AdPage';
import Chat from './Chat';

// Function to handle submits from pages
async function handleFormSubmit(path, data, msg, inputMethod = "POST") {
  // access the database based on the specific path/page
  const PORT = process.env.PORT || 3005;
  const url = `https://tmucentral.onrender.com/api/database/${path}`;
  try {
    const response = await fetch(url, {
      method: inputMethod,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const responseData = await response.json();

    if (!response.ok) {
      if (responseData) {
        alert(responseData.error);
      }
      throw new Error("Network reponse was not okay");
    }

    console.log("Data Submitted: ", responseData);

  } catch (err) {
    console.error(err);
  }
};

// Function to route the pages and create their path
function App() {
  return (

    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/forgot-password" element={<ForgotPassword />} />

          <Route path='/postad' element={
            <PostAd onFormSubmit={handleFormSubmit} />
          } />
          <Route path='/editad' element={
            <EditAd onFormSubmit={handleFormSubmit} />
          } />
          <Route path='/chat' element={
            <>
              <NavBar></NavBar> <br></br>
              <Chat />
            </>
          } />


          <Route element={<PrivateRoute />}>
            <Route path="/" element={
              <div>
                <NavBar></NavBar> <br></br>
                <div>
                  <AdDisplayCard></AdDisplayCard>
                </div>
              </div>
            } />
          </Route>
          <Route path="/searchresults/:title" element={
            <SearchResult />
          } />

          <Route path="/register" element={
            <Register onFormSubmit={handleFormSubmit} />
          } />

          <Route path="/login" element={
            <Login onFormSubmit={handleFormSubmit} />
          } />
          <Route path="/myads" element={<MyAdDisplayCard />} />

          <Route element={<AdminPrivateRoute />}>
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>

          <Route element={<PrivateRoute />}>
            <Route path="/ad/:adId" element={
              <>
                <NavBar /> <br></br>
                <AdPage />
              </>} />
          </Route>

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;