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


const UpdateEvent = () => {

    // hook to get value from passed params
    const { id } = useParams();
    // console.log(id)
    const [eventName, setEventName] = useState('');
    const [eventDate, setEventDate] = useState(new Date())
    // const [description, setDescription] = useState('');

    const [update, setUpdate] = useState("Update")

    const getData = async () => {
        try {
            const response = await axios.get(`${apiLink}events/edit/${id}`);
            const data = response.data.data

            setEventName(data.event_name)
            setEventDate(data.event_date)
            // setImage(data.image_path)

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
            const response = await axios.put(`${apiLink}events/update`, {
                id: id,
                event_date: eventDate,
                event_name: eventName

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
                <Breadcrumb pageName="Update Event " />

                <div className="grid lg:grid-cols-2 sm:grid-cols-1 md:grid-cols-2 gap-8">

                    <div>
                        <label className="mb-3 block text-black dark:text-white">
                            Event Name
                        </label>
                        <input rows="1" value={eventName} onChange={(e) => setEventName(e.target.value)} placeholder="Enter Description" class="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"></input>
                    </div>

                    <div>
                        <label className="mb-3 block text-black dark:text-white">
                            Event Date
                        </label>
                        <div className='flex w-full'>
                            <DatePicker placeholderText='Select Event Date' selected={eventDate} onChange={(date) => setEventDate(date)} className='w-full flex rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary' />
                        </div>
                    </div>



                </div>

                <div className="w-50 mx-auto mt-5">
                    <button onClick={() => handleUpdate()}
                        className="flex justify-center font-bold rounded-lg bg-primary text-white text-center w-50  py-3"
                    >{update}</button>

                </div>

            </DefaultLayout>


        </>
    );
}
export default UpdateEvent;