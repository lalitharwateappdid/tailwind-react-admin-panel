import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import Notify from '../../components/toast_notify/Notify';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { apiLink } from '../../api_link';
import Swal from 'sweetalert2';
import axios from 'axios';
import ModalImage from "react-modal-image";
import { apiImageLink } from "../../api_link";


const UpdateEbook = () => {

    function handlePdf(e) {
        // console.log(e.target.files)
        setPdf(e.target.files[0])
    }

    function handleImage(e) {
        // console.log(e.target.files)
        setImage(e.target.files[0])
    }

    const { id } = useParams();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [author, setAuthorName] = useState("");
    const [image, setImage] = useState("");
    const [pdf, setPdf] = useState("")

    const [update, setUpdate] = useState("Update")

    const getData = async () => {
        try {
            const response = await axios.get(`${apiLink}ebook/edit/${id}`);
            const data = response.data.data
            console.log(data);
            setName(data.name)
            setDescription(data.description)
            setAuthorName(data.authorName)
            setImage(data.coverPath)
            setPdf(data.pdfPath)

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
            formData.append("id", `${id}`)
            formData.append("coverPath", image);
            formData.append("pdfPath", pdf);
            formData.append("name", name);
            formData.append("description", description);
            formData.append("authorName", author);
            console.log(formData)
            setUpdate("Updating...")
            const response = await axios.put(`${apiLink}ebook/update`, formData, {
                headers: {
                    "Content-type": "multipart/form-data"
                }


            });

            // console.log(response)
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
                <Breadcrumb pageName="Update Ebook " />
                <div className='rounded-lg px-5 py-10 bg-[#fff] shadow-xl dark:bg-transparent'>
                    <div className="grid lg:grid-cols-2 sm:grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <label className="mb-3 block text-black dark:text-white">
                                Name
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
                                Description
                            </label>
                            <textarea rows="1" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter Description" class="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"></textarea>
                        </div>

                        <div>
                            <label className="mb-3 block text-black dark:text-white">
                                Author Name
                            </label>
                            <input
                                type="text"
                                placeholder="Enter Author Name"
                                value={author}
                                onChange={(e) => setAuthorName(e.target.value)}
                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                        </div>




                    </div>


                    <div className="grid lg:grid-cols-2 sm:grid-cols-1 md:grid-cols-2 gap-8 mt-10 align-middle">
                        <div>
                            <label className="mb-3 block text-black dark:text-white">Upload Image</label><input onChange={handleImage} type="file" className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary" /></div>
                        <div className='flex items-center'>
                            <div >
                                <ModalImage className="w-[50px]  z-9999"
                                    small={image}
                                    large={image}

                                />
                            </div>
                        </div>


                        <div className=''>

                            <label className="mb-3 block text-black dark:text-white">
                                PDF Path
                            </label>
                            <input type="file" onChange={handlePdf} className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary" />
                        </div>
                        <div className='flex items-end'>
                            <a href={`${apiImageLink}` + pdf} target="_blank"><i className="bg-primary hover:opacity-70 transition text-white p-3 rounded-full fa-solid fa-eye"></i></a>
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
export default UpdateEbook;