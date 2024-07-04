import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import Notify from '../../components/toast_notify/Notify';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ModalImage from "react-modal-image";
import { apiImageLink, apiLink } from "../../api_link";


const UpdateMasterImage = () => {



    const [image, setImage] = useState(null);
    const [submit, setSubmit] = useState("Update")

    const { id } = useParams()

    const formData = new FormData();
    const handleFileChange = (e) => {
        const file = e.target.files[0]; // Get the first selected file
        // setImage(file);
        formData.append("image", file);
        formData.append("id", `${id}`)

        // createMedia(file)// Set the selected file to the image state
    };

    // function to store books
    const getData = async () => {
        try {
            const response = await axios.get(`${apiLink}masterimage/edit/${id}`);
            const data = response.data.data
            console.log(data)


            setImage(data.cover_image)

        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getData();
    }, []);


    const createMedia = async () => {

        try {


            console.log(image)
            setSubmit("Updating...")
            const response = await axios.put(`${apiLink}masterimage/update`, formData, {
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
                <Breadcrumb pageName="Update Category Image" />

                <div className="bg-[#fff] rounded-lg px-5 py-10 shadow-lg dark:bg-transparent">
                    <div className="w-[190px]">
                    <ModalImage className="w-20  z-9999"
                            small={`${apiImageLink}`+image}
                            large={`${apiImageLink}`+image}

                        />
                    </div>
                    <div className="grid lg:grid-cols-2 sm:grid-cols-1 md:grid-cols-2 gap-8">


                        <div>
                            <label className="mb-3 block text-black dark:text-white">
                                Image
                            </label>
                            <input type="file" onChange={handleFileChange} className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary" />
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
export default UpdateMasterImage;