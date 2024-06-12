import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import LiteratureTable from '../../components/Tables/LiteratureTable';
import DefaultLayout from '../../layout/DefaultLayout';

const Literature = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Master Image" />
      <LiteratureTable />
    </DefaultLayout>
  );
};

export default Literature;
