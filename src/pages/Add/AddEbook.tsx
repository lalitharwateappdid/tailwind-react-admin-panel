import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import Notify from '../../components/toast_notify/Notify';
import { useState } from 'react';
import { apiLink } from '../../api_link';
import Swal from 'sweetalert2';
import axios from 'axios';


const AddEbook = () => {


    const [name, setName] = useState("");
    const [description,setDescription] = useState("")
    const [authorName,setAuthorName] = useState("")
    const [coverPath, setCoverPath] = useState("")
    const [pdfPath, setPdfPath] = useState("")
    const [submit, setSubmit] = useState("Submit")

    // function to store books
    const createEBook = async () => {
        try {
            setSubmit("Submitting...")
            const response = await axios.post(`${apiLink}ebook/create`, {
                name: name,
                description:description,
                authorName: authorName,
                coverPath: coverPath,
                pdfPath:pdfPath
            });
            Notify(response.data.message);
            setName('');
            setDescription('');
            setAuthorName('')
            setCoverPath('')
            setPdfPath('')
            
         
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
                <div className="bg-white shadow-lg p-4 rounded dark:bg-transparent">
                <div className="grid lg:grid-cols-2 sm:grid-cols-1 md:grid-cols-2 gap-8 ">
                  
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
                      
                         <textarea rows="1" value={description} onChange={(e) => setDescription(e.target.value)}  placeholder="Enter Description" class="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"></textarea>
                    </div>

                    <div>
                        <label className="mb-3 block text-black dark:text-white">
                            Author Name
                        </label>
                      
                         <textarea rows="1" value={authorName} onChange={(e) => setAuthorName(e.target.value)}  placeholder="Enter Description" class="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"></textarea>
                    </div>

                    <div>
                        
                        <div><label className="mb-3 block text-black dark:text-white">Upload Image</label><input type="file" onChange={(e) => setCoverPath(e.target.value)} className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"/></div>
                      
                         {/* <textarea rows="1" value={coverPath} onChange={(e) => setCoverPath(e.target.value)}  placeholder="Enter Description" className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"></textarea> */}
                    </div>

                    <div>
                        <label className="mb-3 block text-black dark:text-white">
                            PDF Path
                        </label>
                      
                         <textarea rows="1" value={pdfPath} onChange={(e) => setPdfPath(e.target.value)}  placeholder="Enter Description" class="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"></textarea>
                    </div>
                    
                </div>
                <div className="w-50 mx-auto mt-5">
                    <button onClick={() => createEBook()}
                        className="flex justify-center font-bold rounded-lg bg-primary text-white text-center w-50  py-3"
                    >{submit}</button>

                </div>
                </div>

            </DefaultLayout>


        </>
    );
}
export default AddEbook;