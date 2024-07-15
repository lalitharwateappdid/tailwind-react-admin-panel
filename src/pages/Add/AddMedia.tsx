import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import Notify from '../../components/toast_notify/Notify';
import { useState } from 'react';
import { apiLink } from '../../api_link';
import Swal from 'sweetalert2';
import axios from 'axios';


const AddMedia = () => {


    const [title, setTitle] = useState("");
    const [link, setLink] = useState("");
    const [thumbnail, setThumbnail] = useState("")
    const [submit, setSubmit] = useState("Submit")

    const handleFileChange = (e) => {
        setThumbnail(e.target.files[0])
    }


    // function to store books
    const createMedia = async () => {
        console.log(title, link);
        try {
            const formData = new FormData()
            formData.append("title", title)
            formData.append("link", link)
            formData.append("thumbnail", thumbnail)
            setSubmit("Submitting...")
            const response = await axios.post(`${apiLink}media/create`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            Notify(response.data.message);
            setTitle("")
            setLink("")
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
                <Breadcrumb pageName="Add Youtube Media" />
                <div className='bg-[#fff] px-5 py-10 shadow-xl rounded-lg dark:bg-transparent'>
                    <div className="grid lg:grid-cols-2 sm:grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <label className="mb-3 block text-black dark:text-white">
                                Title
                            </label>
                            <input
                                type="text"
                                placeholder="Enter Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                        </div>
                        <div>
                            <label className="mb-3 block text-black dark:text-white">
                                Link
                            </label>
                            <input
                                type="text"
                                placeholder="Add Youtube Link"
                                value={link}
                                onChange={(e) => setLink(e.target.value)}
                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                        </div>




                        <div>
                            <label className="mb-3 block text-black dark:text-white">
                                Youtube Thumbnail
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

            </DefaultLayout >


        </>
    );
}
export default AddMedia;