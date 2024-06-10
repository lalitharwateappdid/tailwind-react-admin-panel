import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import EventTable from '../../components/Tables/EventTable';
import DefaultLayout from '../../layout/DefaultLayout';

const Event = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Events" />
      <EventTable />
    </DefaultLayout>
  );
};

export default Event;
