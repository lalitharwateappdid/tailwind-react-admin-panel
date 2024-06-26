import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import Notify from '../../components/toast_notify/Notify';
import { useEffect, useState } from 'react';
import { apiImageLink, apiLink } from '../../api_link';
import Swal from 'sweetalert2';
import axios from 'axios';
import { InputSwitch } from 'primereact/inputswitch';
import ModalImage from "react-modal-image";
import { Sidebar } from 'primereact/sidebar';


const AddCategory = () => {


    const [name, setName] = useState("");
    const [description, setDescription] = useState("")
    const [submit, setSubmit] = useState("Submit")
    const [child, setChild] = useState(false)
    const [category,setCategory] = useState("")
    
    const [categoryImage,setCategoryImage] = useState([])
    const [categoryDropdown,setSubCategoryDropdown] = useState([])

    // function to store books
    const createBook = async () => {
        try {
            setSubmit("Submitting...")
            const response = await axios.post(`${apiLink}category/create`, {
                name: name,
                description: description
            });
            Notify(response.data.message);
            setName('');
            setDescription('');

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


    const fetchData = async () => {
      const response = await axios.get(`${apiLink}category/get`);
      const result = await response.data.data
      setSubCategoryDropdown(result)
  }

  const fetchCategoryImage = async() => {
    const response = await axios.get(`${apiLink}masterimage/get`);
    // console.log(response)
    const result = await response.data.data
    setCategoryImage(result)
  }


  useEffect(() => {
      fetchData()
      fetchCategoryImage()
  })

    return (
        <>



            <DefaultLayout>
                <Breadcrumb pageName="Add Category" />

                <div className="px-5 py-10 rounded-lg bg-[#fff] dark:bg-transparent shadow-xl">
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
                            <label className="mb-3 block text-black dark:text-white">
                                Category Description
                            </label>

                            <textarea rows="1" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter Description" class="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"></textarea>

                        </div>
                      
                        <div className="flex items-center gap-x-1 ">
                            <InputSwitch className="p-invalid" checked={child} onChange={((e) => setChild(e.target.value))} /> <span> Is There Any Child Category?</span>
                        </div>

                        <div>
                        <label className="mb-2.5 block text-black dark:text-white">
                            Select Image

                        </label>

                        <div className=" z-20 bg-transparent dark:bg-form-input">
                            <select value={categoryImage} onChange={(e) => setCategoryImage(e.target.value)}
                                className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            >
                                <option value="" disabled selected className="text-body dark:text-bodydark">
                                    Select Image
                                </option>
                                {
                                    categoryImage.map((image) => (
                                        <option key={image.id} value={image.id} className="text-body dark:text-bodydark">
                                            <img src={`${apiImageLink}${image.image}`} alt="image description"  />
                                        </option>
                                    ))
                                }

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

                        {
                          child ? 

                          <div>
                        <label className="mb-2.5 block text-black dark:text-white">
                            Select Child Category

                        </label>

                        <div className=" z-20 bg-transparent dark:bg-form-input">
                            <select value={category} onChange={(e) => setCategory(e.target.value)}
                                className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            >
                                <option value="" disabled selected className="text-body dark:text-bodydark">
                                    Select Child Category
                                </option>
                                {
                                    categoryDropdown.map((category) => (
                                        <option key={category.id} value={category.id} className="text-body dark:text-bodydark">
                                            {category.name}
                                        </option>
                                    ))
                                }

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
                    </div> :""
                        }

                    </div>
                    <div className="w-50 mx-auto mt-5">
                        <button onClick={() => createBook()}
                            className="flex justify-center font-bold rounded-lg bg-primary text-white text-center w-50  py-3"
                        >{submit}</button>

                    </div>
                </div>

            </DefaultLayout>


        </>
    );

 
  
}
export default AddCategory;