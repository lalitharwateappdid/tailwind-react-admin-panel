import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import Notify from '../../components/toast_notify/Notify';
import { useState, useEffect } from 'react';
import { apiLink } from '../../api_link';
import Swal from 'sweetalert2';
import axios from 'axios';

const BusinessSettings = () => {


    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [submit,setSubmit] = useState("Submit")
  
    // function to store books
    const createMedia = async () => {

        try {
            const formData = new FormData();
            formData.append("title", title)
            formData.append("description", description);

            // formData.append("id",`${id}`)

            setSubmit("Submitting...")

            const response = await axios.post(`${apiLink}business-settings/create`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });


            Notify(response.data.message);
            setTitle("")
            setDescription("")
            
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

    useEffect(() => {
        const fetchCategoryData = async () => {
            try {
                const category_response = await fetch(`${apiLink}business-settings/get`);
                const category_data = await category_response.json();
                setTitle(category_data.data.about)                
                // setCategoryData(category_data.data);
            } catch (error) {
                console.error("Error fetching category data:", error);
                // Handle error as needed
            }
        };

        fetchCategoryData();
    }, [])

    return (
        <>



            <DefaultLayout>
                <Breadcrumb pageName="Business Settings" />
                <div className="shadow-xl py-10 px-5 bg-[#fff] rounded-lg dark:bg-transparent">

                    <div className="grid lg:grid-cols-2 sm:grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <label className="mb-3 block text-black dark:text-white">
                            About Title
                        </label>
                        <input
                            type="text"
                            placeholder="Enter About Title"
                            
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                    </div>

                    <div>
                        <label className="mb-3 block text-black dark:text-white">
                            About Image
                        </label>
                        <input
                            type="text"
                            placeholder="Enter About Title"
                            
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                    </div>
                      </div>

                      <div className="grid lg:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                      <div>
                        <label className="mb-3 block text-black dark:text-white">
                            About Description
                        </label>
                      
                         <textarea rows="3" placeholder="Enter Description" class="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"></textarea>
                    </div>
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
export default BusinessSettings;