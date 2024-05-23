import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import BookTable from "../../components/Tables/BookTable"
import DefaultLayout from '../../layout/DefaultLayout';

const Books = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Books" />
      <BookTable />
    </DefaultLayout>
  );
};

export default Books;
