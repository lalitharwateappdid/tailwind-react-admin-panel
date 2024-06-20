import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import Notify from '../../components/toast_notify/Notify';
import { useState } from 'react';
import { apiLink } from '../../api_link';
import Swal from 'sweetalert2';
import axios from 'axios';


const AddCategory = () => {


    const [name, setName] = useState("");
    const [description,setDescription] = useState("")
    const [submit, setSubmit] = useState("Submit")

    // function to store books
    const createBook = async () => {
        try {
            setSubmit("Submitting...")
            const response = await axios.post(`${apiLink}category/create`, {
                name: name,
                description:description
            });
            Notify(response.data.message);
            setName('');
            setDescription('');
         
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
                <Breadcrumb pageName="Add Category" />

                <div className="px-5 py-10 rounded-lg bg-[#fff] dark:bg-transparent shadow-xl">
                <div className="grid lg:grid-cols-2 sm:grid-cols-1 md:grid-cols-2 gap-8">
                  
                    <div>
                        <label className="mb-3 block text-black dark:text-white">
                            Category Name
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                    </div>
                    <div>
                        <label className="mb-3 block text-black dark:text-white">
                            Category Description
                        </label>
                      
                         <textarea rows="1" value={description} onChange={(e) => setDescription(e.target.value)}  placeholder="Enter Description" class="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"></textarea>
                    </div>
                    
                </div>
                <div className="w-50 mx-auto mt-5">
                    <button onClick={() => createBook()}
                        className="flex justify-center font-bold rounded-lg bg-primary text-white text-center w-50  py-3"
                    >{submit}</button>

                </div>
                </div>

            </DefaultLayout>


        </>
    );
}
export default AddCategory;