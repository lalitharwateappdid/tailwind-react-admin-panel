import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import Notify from '../../components/toast_notify/Notify';
import { useState,useEffect } from 'react';
import { apiLink } from '../../api_link';
import Swal from 'sweetalert2';
import axios from 'axios';
// import SelectGroupTwo from '../../components/Forms/SelectGroup/SelectGroupTwo';


const BusinessSettings = () => {


    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("")
    const [categoryData, setCategoryData] = useState([])
    const [submit, setSubmit] = useState("Submit")
    const [coverImage,setImage] = useState("")

    const handleImage = (e) => {
        console.log(e.target.files)
        setImage(e.target.files[0])
    }

    // function to store books
    const createMedia = async () => {

        try {
            const formData = new FormData();
            formData.append("coverImage",coverImage)
            formData.append("category_id",category);
            formData.append("description",description);
       
            // formData.append("id",`${id}`)

            setSubmit("Submitting...")
            
            const response = await axios.post(`${apiLink}sub-category/create`,formData, {
                headers:{
                    "Content-Type":"multipart/form-data"
                }
            });

            
            Notify(response.data.message);
            setName("")
            setDescription("")
            setCategory("")
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

    useEffect(()=>{
        const fetchCategoryData = async () => {
            try {
                const category_response = await fetch(`${apiLink}category/get`);
                const category_data = await category_response.json();
                console.log(category_data);
                setCategoryData(category_data.data);
            } catch (error) {
                console.error("Error fetching category data:", error);
                // Handle error as needed
            }
        };
    
        fetchCategoryData();
    },[])

    return (
        <>



            <DefaultLayout>
                <Breadcrumb pageName="Add Sub Category" />
                <div className="shadow-xl py-10 px-5 bg-[#fff] rounded-lg dark:bg-transparent">
                <div className="grid lg:grid-cols-2 sm:grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <label className="mb-3 block text-black dark:text-white">
                            Sub Category Name
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
                        <label className="mb-2.5 block text-black dark:text-white">
                            Select Category
                        </label>

                        <div className=" z-20 bg-transparent dark:bg-form-input">
                            <select value={category} onChange={(e) => setCategory(e.target.value)}
                                className="relative z-20 w-full appearance-none rounded-lg border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            >
                          
                                <option value="" disabled selected className="text-body dark:text-bodydark">
                                    Select Category
                                </option>
                                {
                                    categoryData.map((category) => (
                                        <option key={category.id} value={category.id} className="text-body dark:text-bodydark">
                                            {category.name}
                                        </option>
                                    ))
                                }
                    
                           
                            </select>

                        </div>

                        <div>
                   <label className="mb-3 block text-black dark:text-white">
                            Image
                        </label>
                        <input
                  type="file"
                  onChange={handleImage}
                  className="w-full rounded-md border border-stroke p-3 outline-none transition file:mr-4 file:rounded file:border-[0.5px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2.5 file:text-sm focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-strokedark dark:file:bg-white/30 dark:file:text-white"
                />
                   </div>
                    </div>
                   


                </div>
                <div className="grid lg:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-8 mt-10">
                    <div>
                        <label className="mb-3 block text-black dark:text-white">
                            Sub Category Description
                        </label>
                        <textarea rows="6" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter Description" class="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"></textarea>
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