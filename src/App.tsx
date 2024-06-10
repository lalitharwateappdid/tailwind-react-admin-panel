import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Media from './pages/Home/Media';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import AddBook from './pages/Add/AddBook';
import AddMedia from "./pages/Add/AddMedia";
import UpdateMedia from './pages/Update/UpdateMedia';
import Quotes from './pages/Home/Quotes';
import AddQuotes from './pages/Add/AddQuotes';
import UpdateQuote from './pages/Update/UpdateQuote';
import Category from './pages/Home/Category';
import AddCategory from './pages/Add/AddCategory';
import UpdateCategory from './pages/Update/UpdateCategory';
import Books from './pages/Home/Book';
import UpdateBook from './pages/Update/UpdateBook';
import SubCategory from './pages/Home/SubCategory';
import AddSubCategory from './pages/Add/AddSubCategory';
import UpdateSubCategory from './pages/Update/UpdateSubCategory';
import HomeContent from './pages/Home/HomeContent';
import AddHomeContent from './pages/Add/AddHomeContent';
import UpdateHomeContent from './pages/Update/UpdateHomeContent';
import Ebook from './pages/Home/Ebook';
import AddEvent from './pages/Add/AddEvent';
import Event from './pages/Home/Event';


// private Router
import PrivateRoute from './middleware/PrivateRouter';
import AddEbook from './pages/Add/AddEbook';
import UpdateEvent from './pages/Update/UpdateEvent';


// toast configuration method



function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        <Route
          index
          element={
            <>
              <PrivateRoute>
                <PageTitle title="eCommerce Dashboard | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <ECommerce />
              </PrivateRoute>
            </>
          }
        />
        <Route
          path="/calendar"
          element={
            <>
              <PrivateRoute>
                <PageTitle title="Calendar | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <Calendar />
              </PrivateRoute>
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <PrivateRoute>
                <PageTitle title="Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <Profile />
              </PrivateRoute>
            </>
          }
        />
        <Route
          path="/forms/form-elements"
          element={
            <>
              <PageTitle title="Form Elements | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <FormElements />
            </>
          }
        />
        <Route
          path="/forms/form-layout"
          element={
            <>
              <PageTitle title="Form Layout | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <FormLayout />
            </>
          }
        />
        <Route
          path="/media"
          element={
            <>
              <PrivateRoute>
                <PageTitle title="Youtube Media" />
                <Media />
              </PrivateRoute>
            </>
          }
        />
        <Route
          path="/settings"
          element={
            <>
              <PageTitle title="Settings | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Settings />
            </>
          }
        />
        <Route
          path="/chart"
          element={
            <>
              <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Chart />
            </>
          }
        />
        <Route
          path="/ui/alerts"
          element={
            <>
              <PageTitle title="Alerts | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Alerts />
            </>
          }
        />
        <Route
          path="/ui/buttons"
          element={
            <>
              <PageTitle title="Buttons | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Buttons />
            </>
          }
        />
        <Route
          path="/auth/signin"
          element={
            <>
              <PageTitle title="Signin | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <SignIn />
            </>
          }
        />
        <Route
          path="/auth/signup"
          element={
            <>
              <PageTitle title="Signup | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <SignUp />
            </>
          }
        />


        <Route path='/add-book' element={<AddBook />} />

        {/* youtube media routes */}

        <Route path='/add-media' element={<AddMedia />} />
        <Route path='/edit-media/:id' element={<UpdateMedia />} />


        {/* quote routes */}
        <Route
          path="/quotes"
          element={
            <>
              <PageTitle title="Quote" />
              <Quotes />

            </>
          }
        />
        <Route path='/add-quote' element={<AddQuotes />} />
        <Route path='/edit-quote/:id' element={<UpdateQuote />} />



        {/* Book routes */}
        <Route
          path="/books" element={
            <>
              <PageTitle title="Books" />
              <Books />
            </>
          }
        />
        <Route path='/add-book' element={<AddBook />} />
        <Route path='/edit-book/:id' element={<UpdateBook />} />



        {/* category routes */}
        <Route path='/category' element={
          <>
            <PageTitle title="Category" />
            <Category />
          </>
        } />
        <Route path='/add-category' element={<AddCategory />} />
        <Route path='/edit-category/:id' element={<UpdateCategory />} />



        {/* sub categories */}
        <Route path='/sub-category' element={
          <>
            <PageTitle title="Sub Category" />
            <SubCategory />
          </>
        } />
        <Route path='/add-sub-category' element={<AddSubCategory />} />
        <Route path='/edit-sub-category/:id' element={<UpdateSubCategory />} />

        {/* home content route */}
        <Route path='/home-content' element={
          <>
            <PageTitle title="Home Content" />
            <HomeContent />
          </>
        } />
        <Route path='/add-home-content' element={<AddHomeContent />} />
        <Route path='/edit-home-content/:id' element={<UpdateHomeContent />} />


        {/* ebook path */}
        <Route path='/ebook' element={
          <>
            <PageTitle title="Ebook" />
            <Ebook />
          </>


        } />
        <Route path="/add-ebook" element={<AddEbook />} />



        {/* events path starts */}

        <Route path='/events' element={
          <>
            <PageTitle title="Events" />
            <Event />
          </>
        } />

        <Route path="/add-events" element={<AddEvent />} />
        <Route path='/edit-events/:id' element={<UpdateEvent />} />

        {/* event path ends */}

      </Routes>
    </>
  );
}

export default App;
