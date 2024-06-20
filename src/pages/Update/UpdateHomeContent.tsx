import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import Notify from '../../components/toast_notify/Notify';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { apiLink } from '../../api_link';
import Swal from 'sweetalert2';
import axios from 'axios';


const UpdateHomeContent = () => {

    const { id } = useParams();

    function handleImage(e) {
        setImage(e.target.files[0])
    }

    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');
    const [ids, setId] = useState(id)
    const [update, setUpdate] = useState("Update")

    const getData = async () => {
        try {
            const response = await axios.get(`${apiLink}home-content/edit/${id}`);
            const data = response.data.data
            // console.log(data);

            setDescription(data.description)
            setImage(data.image_path)

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
            const formData = new FormData();
            formData.append("id", ids)
            formData.append("image_path", image)
            formData.append("description", description)
            setUpdate("Updating...")
            const response = await axios.put(`${apiLink}home-content/update`, formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }

            );
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
                <Breadcrumb pageName="Update Home Content " />

                <div className="bg-[#fff] rounded-lg px-5 py-10 shadow-xl dark:bg-transparent">
                    <div className="grid lg:grid-cols-2 sm:grid-cols-1 md:grid-cols-2 gap-8">

                        <div>
                            <label className="mb-3 block text-black dark:text-white">
                                Description
                            </label>
                            <textarea rows="1" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter Description" class="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"></textarea>
                        </div>

                        <div>
                            <label className="mb-3 block text-black dark:text-white">
                                Image
                            </label>
                            <div>

                                <input
                                    type="file"
                                    onChange={handleImage}

                                    className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                                />
                            </div>
                            {/* <img src={`${apiLink}${image}`} className='w-20' alt="" /> */}
                        </div>



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
export default UpdateHomeContent;