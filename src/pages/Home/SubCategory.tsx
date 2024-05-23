import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import SubCategoryTable from "../../components/Tables/SubCategoryTable"
import DefaultLayout from '../../layout/DefaultLayout';

const SubCategory = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Sub Category" />
      <SubCategoryTable />
    </DefaultLayout>
  );
};

export default SubCategory;
