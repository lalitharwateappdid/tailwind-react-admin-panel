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
    const [submit, setSubmit] = useState("Submit")

    function handleImage(e) {
        console.log(e.target.files);
        setImage(e.target.files[0])
    }

    function handleDescription(e) {
        console.log(e.target.value);
        setDescription(e.target.value)
    }
    // function to store books
    const createMedia = async () => {

        try {
            const formData = new FormData()
            formData.append("image_path", image);
            formData.append("description", description);
            setSubmit("Submitting...")
            const response = await axios.post(`${apiLink}home-content/create`, formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
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
                <Breadcrumb pageName="Add Slider" />
                <div className="bg-[#fff] rounded-lg px-5 py-10 shadow-xl dark:bg-transparent">
                    <div className="grid lg:grid-cols-2 sm:grid-cols-1 md:grid-cols-2 gap-8">
                        

                        <div>
                            <label className="mb-3 block text-black dark:text-white">
                                Link
                            </label>
                            <input
                                type="file"
                                onChange={handleImage}

                                className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                            />
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
export default AddHomeContent;