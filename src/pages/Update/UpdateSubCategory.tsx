import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import Notify from '../../components/toast_notify/Notify';
import { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { apiLink } from '../../api_link';
import Swal from 'sweetalert2';
import axios from 'axios';


const UpdateSubCategory = () => {


        const { id } = useParams();
        
        const [name, setName] = useState('');
        const [description, setDescription] = useState('');
        const [categoryData,setCategory] = useState([])
    
        const [update,setUpdate] = useState("Update")
      
        const getData =  async () => {
            try{
                const response = await axios.get(`${apiLink}sub-category/edit/${id}`);
                const data = response.data.data
               
                setName(data.name)
                setDescription(data.description)
            }
            catch(err){
                console.log(err);
            }
    }

    useEffect(()=>{
        const getCategory = async() => {
            try {
                const category_response = await fetch(`${apiLink}category/get`);
                const category_data = await category_response.json();
                setCategory(category_data.data);
            } catch (error) {
                console.error("Error fetching category data:", error);
            }
        }
        getCategory();

        getData();
    },[]);

    const handleUpdate = async () => {
        try{
            setUpdate("Updating...")
            const response = await axios.put(`${apiLink}sub-category/update`,{
                id:id,
                name:name,
                description:description
            });
            Notify(response.data.message);
            setUpdate("Update")

        }
        catch(err){
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
                <Breadcrumb pageName="Update Sub Category " />
               
                <div className="grid lg:grid-cols-2 sm:grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <label className="mb-3 block text-black dark:text-white">
                            Category Name
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
                            <select value={categoryData}
                                className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
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
                                {/* <option value="USA" className="text-body dark:text-bodydark">
                                    USA
                                </option>
                                <option value="UK" className="text-body dark:text-bodydark">
                                    UK
                                </option>
                                <option value="Canada" className="text-body dark:text-bodydark">
                                    Canada
                                </option> */}
                            </select>

                            <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                                <svg
                                    className="fill-current"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <g opacity="0.8">
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                                            fill=""
                                        ></path>
                                    </g>
                                </svg>
                            </span>
                        </div>
                    </div>
                </div>

                    <div className="grid lg:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-8 mt-10" >
                        <div>
                        <label className="mb-3 block text-black dark:text-white">
                            Category Description
                        </label>
                        <textarea rows="5" value={description} onChange={(e) => setDescription(e.target.value)}  placeholder="Enter quote" class="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"></textarea>
                   </div>
                   </div>
                <div className="w-50 mx-auto mt-5">
                    <button onClick={() => handleUpdate()}
                        className="flex justify-center font-bold rounded-lg bg-primary text-white text-center w-50  py-3"
                    >{update}</button>

                </div>

            </DefaultLayout>


        </>
    );
}
export default UpdateSubCategory;