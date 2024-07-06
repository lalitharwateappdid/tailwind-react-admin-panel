import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import Notify from '../../components/toast_notify/Notify';
import { useEffect, useState } from 'react';
import { apiImageLink, apiLink } from '../../api_link';
import Swal from 'sweetalert2';
import axios from 'axios';
import { InputSwitch } from 'primereact/inputswitch';
// import ModalImage from "react-modal-image";
import Select from 'react-select'


const AddCategory = () => {

    const countries = [
        { value: 'me', label: 'Montenegro', image: 'https://plus.unsplash.com/premium_photo-1676637000058-96549206fe71?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { value: 'rs', label: 'Serbia', image: 'https://plus.unsplash.com/premium_photo-1676637000058-96549206fe71?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }
    ];


    const [name, setName] = useState("");
    const [description, setDescription] = useState("")
    const [submit, setSubmit] = useState("Submit")
    const [child, setChild] = useState(false)
    const [category, setCategory] = useState("")

    const [categoryImage, setCategoryImage] = useState([])
    const [categoryDropdown, setSubCategoryDropdown] = useState([])

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

    const fetchCategoryImage = async () => {
        const response = await axios.get(`${apiLink}masterimage/get`);
        // console.log(response)
        const result = await response.data.data
        setCategoryImage(result)
    }


    useEffect(() => {
        fetchData()
        fetchCategoryImage()
    })



    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            width: '100%',
            borderRadius: '0.5rem',
            borderWidth: '1.5px',
            borderColor: state.isFocused ? '#3b82f6' : '#d1d5db', // Tailwind border-primary and border-stroke
            backgroundColor: 'transparent',
            padding: '0.75rem 1.25rem',
            color: '#000000',
            outline: 'none',
            transition: 'border-color 0.2s',
            '&:hover': {
                borderColor: '#3b82f6'
            },
            '&:disabled': {
                cursor: 'default',
                backgroundColor: '#f9fafb', // Tailwind bg-whiter
            },
            ...(state.isFocused && { borderColor: '#3b82f6' }),
        }),
        singleValue: (provided) => ({
            ...provided,
            color: '#000000', // Tailwind text-black
        }),
        placeholder: (provided) => ({
            ...provided,
            color: '#000000', // Tailwind text-black
        }),
        option: (provided, state) => ({
            ...provided,
            display: 'flex',
            alignItems: 'center',
            color: state.isSelected ? '#3b82f6' : '#000000', // Tailwind text-primary and text-blackasd
            backgroundColor: state.isFocused ? '#e0f2fe' : 'transparent', // Tailwind bg-primary-light
            padding: '0.75rem 1.25rem',
        }),
        menu: (provided) => ({
            ...provided,
            zIndex: 8000,
            backgroundColor: 'transparent', // Transparent menu background
        }),
        menuList: (provided) => ({
            ...provided,
            padding: '0',
            backgroundColor: 'transparent', // Transparent menu list background
        }),
    };

    return (
        <>



            <DefaultLayout>
                <Breadcrumb pageName="Add Category" />

                <div className="px-5 py-10 rounded-lg bg-[#fff] dark:bg-transparent shadow-xl">
                    <div className="grid lg:grid-cols-2 sm:grid-cols-1 md:grid-cols-2 gap-8">

                        <div>
                            <p className='mb-2'>Select Image</p>
                            <Select
                                styles={customStyles}
                                options={categoryImage}
                                className="z-50"
                                formatOptionLabel={(country) => (

                                    <img src={country.cover_image} />


                                )}
                            />
                        </div>

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
                                </div> : ""
                        }

                    </div>
                    <div className="w-50 mx-auto mt-5">
                        <button onClick={() => createBook()}
                            className="flex justify-center font-bold rounded-lg bg-primary text-white text-center w-50  py-3"
                        >{submit}</button>

                    </div>
                </div>

            </DefaultLayout >


        </>
    );



}
export default AddCategory;