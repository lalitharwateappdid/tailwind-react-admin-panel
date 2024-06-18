import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import Notify from '../../components/toast_notify/Notify';
import { useState } from 'react';
import { apiLink } from '../../api_link';
import Swal from 'sweetalert2';
import axios from 'axios';


const AddHomeContent = () => {


    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [submit,setSubmit] = useState("Submit")
  
    function handleImage(e){
        console.log(e.target.files);
        setImage(e.target.files[0])
    }

    function handleDescription(e){
        console.log(e.target.value);
        setDescription(e.target.value)
    }
    // function to store books
    const createMedia = async () => {
       
        try {
            const formData = new FormData()
            formData.append("image_path",image);
            formData.append("description",description);
            setSubmit("Submitting...")
            const response = await axios.post(`${apiLink}home-content/create`, formData,
                {
                    headers:{
                        "Content-Type":"multipart/form-data"
                    }
                }
            );
            Notify(response.data.message);
            setDescription("")
            setImage("")
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
                <Breadcrumb pageName="Add Home Content" />
                <div className="grid lg:grid-cols-2 sm:grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                        <label className="mb-3 block text-black dark:text-white">
                            Description
                        </label>
                        <textarea rows="1"  onChange={handleDescription}  placeholder="Enter Description" class="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"></textarea>
                   </div>
                  
                    <div>
                        <label className="mb-3 block text-black dark:text-white">
                            Link
                        </label>
                        <input
                            type="file"
                            placeholder="Upload Image"
                            onChange={handleImage}
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                    </div>
                   
                </div>
                <div className="w-50 mx-auto mt-5">
                    <button onClick={() => createMedia()}
                        className="flex justify-center font-bold rounded-lg bg-primary text-white text-center w-50  py-3"
                    >{submit}</button>

                </div>

            </DefaultLayout>


        </>
    );
}
export default AddHomeContent;