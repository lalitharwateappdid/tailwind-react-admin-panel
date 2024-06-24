import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import YoutubeMediaTable from "../../components/Tables/YoutubeMediaTable"
import DefaultLayout from '../../layout/DefaultLayout';

const Notification = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Notification" />
      <YoutubeMediaTable />
    </DefaultLayout>
  );
};

export default Notification;
