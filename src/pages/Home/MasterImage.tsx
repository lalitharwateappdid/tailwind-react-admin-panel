import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import MasterImageTable from '../../components/Tables/MasterImage';
import DefaultLayout from '../../layout/DefaultLayout';

const Literature = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Category Image" />
      <MasterImageTable />
    </DefaultLayout>
  );
};

export default Literature;
