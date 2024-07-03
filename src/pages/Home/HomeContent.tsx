import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import HomeContentTable from '../../components/Tables/HomeContentTable';

const HomeContent = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Slider" />
      <HomeContentTable />
    </DefaultLayout>
  );
};

export default HomeContent;
