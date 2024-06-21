import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import Notify from '../../components/toast_notify/Notify';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { apiLink } from '../../api_link';
import Swal from 'sweetalert2';
import axios from 'axios';



import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const UpdateQuote = () => {


    const { id } = useParams();

    const [quote, setQuote] = useState('');
    const [date, setDate] = useState(new Date())


    const [update, setUpdate] = useState("Update")

    const getData = async () => {
        try {
            const response = await axios.get(`${apiLink}quote/edit/${id}`);
            const data = response.data.data
            console.log(data)

            setQuote(data.quote)
            setDate(data.date)

        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    const handleUpdate = async () => {
        try {
            setUpdate("Updating...")
            const response = await axios.put(`${apiLink}quote/update`, {
                id: id,
                quote: quote,
                date: date
            });
            Notify(response.data.message);
            setUpdate("Update")

        }
        catch (err) {
            setUpdate("Update")
            Swal.fire({
                title: "Error!",
                text: `${err}`,
                icon: "warning"
            });
        }
    }



    return (

        <>
            <DefaultLayout>
                <Breadcrumb pageName="Update Quote" />

                <div className='bg-[#fff] rounded-lg px-5 py-10 dark:bg-transparent shadow-xl'>
                    <div className="grid lg:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <label className="mb-3 block text-black dark:text-white">
                                Quote
                            </label>
                            {/* <input
                            type="text"
                            placeholder="Enter Quote"
                            value={quote}
                            onChange={(e) => setQuote(e.target.value)}
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        /> */}
                            <textarea rows="6" value={quote} onChange={(e) => setQuote(e.target.value)} placeholder="Enter quote" class="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"></textarea>
                        </div>

                    </div>

                    <div className="grid md:grid-cols-1 mt-8">
                        <label className="mb-3 block text-black dark:text-white">
                            Quote Date
                        </label>
                        <DatePicker placeholderText='Select Event Date' selected={date} onChange={(e) => setDate(e)} className='w-full flex rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary' />

                    </div>

                    <div className="w-50 mx-auto mt-5">
                        <button onClick={() => handleUpdate()}
                            className="flex justify-center font-bold rounded-lg bg-primary text-white text-center w-50  py-3"
                        >{update}</button>

                    </div>
                </div>

            </DefaultLayout>


        </>
    );
}
export default UpdateQuote;