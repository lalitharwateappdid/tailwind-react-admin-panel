import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import QuotesTable from "../../components/Tables/QuotesTable";
import DefaultLayout from '../../layout/DefaultLayout';

const Quotes = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Quotes" />
      <QuotesTable />
    </DefaultLayout>
  );
};

export default Quotes;
