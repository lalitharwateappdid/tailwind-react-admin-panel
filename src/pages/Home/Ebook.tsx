import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import EbookTable from "../../components/Tables/EbookTable";
import DefaultLayout from '../../layout/DefaultLayout';

const Ebook = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Ebook" />
      <EbookTable />
    </DefaultLayout>
  );
};

export default Ebook;
