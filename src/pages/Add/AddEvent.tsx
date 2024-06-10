import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import Notify from '../../components/toast_notify/Notify';
import { useState } from 'react';
import { apiLink } from '../../api_link';
import Swal from 'sweetalert2';
import axios from 'axios';
import DatePickerOne from '../../components/Forms/DatePicker/DatePickerOne';
import SelectGroupOne from '../../components/Forms/SelectGroup/SelectGroupOne';


const AddEvent = () => {

    // const days = 

    const [eventName, setEventName] = useState("");
    const [eventDate, setEventDate] = useState("")
    const [day, setDay] = useState("")
    const [year, setYear] = useState("")
    const [month, setMonth] = useState("")
    const [submit, setSubmit] = useState("Submit")

    // function to store books
    const createEBook = async () => {
        try {
            setSubmit("Submitting...")
            const response = await axios.post(`${apiLink}events/create`, {
                event_name: eventName,
                event_date: eventDate,
                day: day,
                year: year,
                month: month
            });
            Notify(response.data.message);
            setEventDate('');
            setEventName('');
            setDay('')
            setYear('')
            setMonth('')


            setSubmit("Submit")
        }
        catch (err) {
            setSubmit("Submit")
            Swal.fire({
                title: "Deleted!",
                text: `${err}`,
                icon: "warning"
            });
            console.log("Something went wrong please try again later");
        }
    }

    return (
        <>



            <DefaultLayout>
                <Breadcrumb pageName="Add Ebook" />
                <div className="grid lg:grid-cols-2 sm:grid-cols-1 md:grid-cols-2 gap-8">

                    <div>
                        <label className="mb-3 block text-black dark:text-white">
                            Event Name
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Name"
                            value={name}
                            onChange={(e) => setEventName(e.target.value)}
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                    </div>
                    <div>
                        <label className="mb-3 block text-black dark:text-white">
                            Event Date
                        </label>
                        <DatePickerOne />
                    </div>

                    <div>
                        <label className="mb-3 block text-black dark:text-white">
                            Event Day
                        </label>

                        <SelectGroupOne disabled_option_name="Select Day" array={["रविवार",
                            "सोमवार",
                            "मंगळवार",
                            "बुधवार",
                            "गुरुवार",
                            "शुक्रवार",
                            "शनिवार"]} />
                    </div>

                    <div>

                        <div><label className="mb-3 block text-black dark:text-white">Upload Image</label><input type="file" onChange={(e) => setCoverPath(e.target.value)} className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary" /></div>

                        {/* <textarea rows="1" value={coverPath} onChange={(e) => setCoverPath(e.target.value)}  placeholder="Enter Description" className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"></textarea> */}
                    </div>

                    <div>
                        <label className="mb-3 block text-black dark:text-white">
                            PDF Path
                        </label>

                        <textarea rows="1" value={year} onChange={(e) => setYear(e.target.value)} placeholder="Enter Description" class="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"></textarea>
                    </div>

                </div>
                <div className="w-50 mx-auto mt-5">
                    <button onClick={() => createEBook()}
                        className="flex justify-center font-bold rounded-lg bg-primary text-white text-center w-50  py-3"
                    >{submit}</button>

                </div>

            </DefaultLayout>


        </>
    );
}
export default AddEvent;