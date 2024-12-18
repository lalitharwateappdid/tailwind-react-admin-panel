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
import Literature from './pages/Home/Literature';
import AddLiterature from './pages/Add/AddLiterature';
import UpdateLiterature from './pages/Update/UpdateLiterature';
import MasterImage from "./pages/Home/MasterImage";
import AddMasterImage from "./pages/Add/AddMasterImage";

import BusinessSettings from "./pages/Add/BusinessSettings";

// import UpdateEbook from './pages/Update/UpdateEBook';
// private Router
import PrivateRoute from './middleware/PrivateRouter';
import AddEbook from './pages/Add/AddEbook';
import UpdateEvent from './pages/Update/UpdateEvent';
import UpdateEbook from './pages/Update/UpdateEbook';
import UpdateMasterImage from './pages/Update/UpdateMasterImage';
import UnMapCategory from './pages/Home/UnmapCategory';

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
                <PageTitle title="SadhanaAnand" />
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
                <PageTitle title="SadhanaAnand" />
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
                <PageTitle title="SadhanaAnand" />
                <Profile />
              </PrivateRoute>
            </>
          }
        />
        <Route
          path="/forms/form-elements"
          element={
            <>
              <PageTitle title="SadhanaAnand" />
              <FormElements />
            </>
          }
        />
        <Route
          path="/forms/form-layout"
          element={
            <>
              <PageTitle title="SadhanaAnand" />
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
             <PrivateRoute>
              <PageTitle title="SadhanaAnand" />
              <Settings />
              </PrivateRoute>
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
              <PageTitle title="SadhanaAnand" />
              <SignIn />
            </>
          }
        />
        <Route
          path="/auth/signup"
          element={
            <>
              <PageTitle title="SadhanaAnand" />
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

        {/* unmap category route */}
        <Route path='/unmap-category' element={<UnMapCategory />} />



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
        <Route path="/edit-ebook/:id" element={<UpdateEbook />} />



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


        {/* literature path starts */}
        <Route path='/literature' element={
          <>
            <PageTitle title="Literature" />
            <Literature />
          </>
        } />

        <Route path='/add-literature' element={<AddLiterature />} />
        <Route path='edit-literature/:id' element={<UpdateLiterature />} />
        {/* literature path ends */}

        {/* master image path starts */}
        <Route path='/master-image' element={
          <>
            <PageTitle title="Master Image" />
            <MasterImage />
          </>
        } />

        <Route path='/add-master-image' element={<AddMasterImage />} />
        <Route path="/edit-master-image/:id" element={<UpdateMasterImage />} />
        <Route path='edit-literature/:id' element={<UpdateLiterature />} />
        {/* master image path ends */}

        <Route path="/business-settings" element={<BusinessSettings/>} />

      </Routes>
    </>
  );
}

export default App;
