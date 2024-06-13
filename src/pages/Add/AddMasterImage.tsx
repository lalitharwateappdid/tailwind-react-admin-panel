import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import Notify from '../../components/toast_notify/Notify';
import { useState } from 'react';
import { apiLink } from '../../api_link';
import Swal from 'sweetalert2';
import axios from 'axios';


const AddMasterImage = () => {



    const [image, setImage] = useState(null);
    const [submit, setSubmit] = useState("Submit")

    const formData = new FormData();
    const handleFileChange = (e) => {
        const file = e.target.files[0]; // Get the first selected file
        // setImage(file);
        formData.append("image", file);
       
        // createMedia(file)// Set the selected file to the image state
    };

    // function to store books
    const createMedia = async () => {
        
        try {
            console.log(image)
            setSubmit("Submitting...")
            const response = await axios.post(`${apiLink}masterimage/create`,  formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            Notify(response.data.message);

            setImage(null)
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
                            Link
                        </label>
                        <input
                            type="file"
                            placeholder="Upload Image"

                            onChange={(e) => handleFileChange(e)}
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
export default AddMasterImage;