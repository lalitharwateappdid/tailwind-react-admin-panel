import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import YoutubeMediaTable from "../../components/Tables/YoutubeMediaTable"
import DefaultLayout from '../../layout/DefaultLayout';

const Media = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Youtube Media" />
      <YoutubeMediaTable />
    </DefaultLayout>
  );
};

export default Media;
