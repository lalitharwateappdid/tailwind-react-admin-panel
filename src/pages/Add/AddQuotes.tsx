import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import Notify from '../../components/toast_notify/Notify';
import { useState } from 'react';
import { apiLink } from '../../api_link';
import Swal from 'sweetalert2';
import axios from 'axios';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddQuotes = () => {


    const [quote, setQuote] = useState("");
    const [date, setDate] = useState(new Date());
    const [submit, setSubmit] = useState("Submit")


    // function to store books
    const createMedia = async () => {

        try {
            setSubmit("Submitting...")
            const response = await axios.post(`${apiLink}quote/create`, {
                quote: quote,
                date: date


            });

            Notify(response.data.message);
            setQuote("")


            setSubmit("Submit")
        }
        catch (err) {
            setSubmit("Submit")
            Swal.fire({
                title: "Error!",
                text: `${err}`,
                icon: "warning"
            });
            console.log("Something went wrong please try again later");
        }
    }

    return (
        <>



            <DefaultLayout>
                <Breadcrumb pageName="Add Quote" />
                <div className="bg-[#fff] shadow-xl dark:bg-transparent px-5 py-10 rounded-lg">
                    <div className="grid lg:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-8 ">
                        <div>
                            <label className="mb-3 block text-black dark:text-white">
                                Quote
                            </label>
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
                        <button onClick={() => createMedia()}
                            className="flex justify-center font-bold rounded-lg bg-primary text-white text-center w-50  py-3"
                        >{submit}</button>

                    </div>
                </div>

            </DefaultLayout>


        </>
    );
}
export default AddQuotes;