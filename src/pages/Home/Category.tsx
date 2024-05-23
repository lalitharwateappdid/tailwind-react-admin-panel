import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import CategoryTable from "../../components/Tables/CategoryTable"
import DefaultLayout from '../../layout/DefaultLayout';

const Category = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Category" />
      <CategoryTable />
    </DefaultLayout>
  );
};

export default Category;
