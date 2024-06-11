import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import Notify from '../../components/toast_notify/Notify';
import { useState, useEffect } from 'react';
import { apiLink } from '../../api_link';
import Swal from 'sweetalert2';
import axios from 'axios';


const AddLiterature = () => {


    const [category, setCategory] = useState('')
    const [subCategory, setSubCategory] = useState("")
    const [literatureEnglish, setLiteratureEnglish] = useState("")
    const [literatureMarathi, setLiteratureMarathi] = useState("")
    const [literatureDescriptionEnglish, setLiteratureDescriptionEnglish] = useState("")
    const [literatureDescriptionMarathi, setLiteratureDescriptionMarathi] = useState("")
    const [authorNameEnglish, setAuthorNameEnglish] = useState("")
    const [authorNameMarathi, setAuthorNameMarathi] = useState("")
    const [saintNameEnglish, setSaintNameEnglish] = useState("")
    const [saintNameMarathi, setSaintNameMarathi] = useState("")
    const [literatureContent, setLiteratureContent] = useState("")
    const [audioFilePath, setAudioFilePath] = useState("")

    // third party
    const [categoryData, setCategoryData] = useState([])
    const [subCategoryData, setSubCategoryData] = useState([])

    const [submit, setSubmit] = useState("Submit")


    // function to store books
    const createMedia = async () => {

        try {
            setSubmit("Submitting...")
            const response = await axios.post(`${apiLink}literature/create`, {
                category_id: category,
                sub_category_id: subCategory,
                literature_english: literatureEnglish,
                literature_marathi: literatureMarathi,
                literature_description_english: literatureDescriptionEnglish,
                literature_description_marathi: literatureDescriptionMarathi,
                author_name_english: authorNameEnglish,
                author_name_marathi: authorNameMarathi,
                saint_name_english: saintNameEnglish,
                saint_name_marathi: saintNameMarathi,
                literature_content: literatureContent,
                audio_file_path: audioFilePath
            });
            Notify(response.data.message);
            setCategory("")
            setSubCategory('')
            setLiteratureEnglish("")
            setLiteratureMarathi("")
            setLiteratureDescriptionEnglish("")
            setLiteratureDescriptionMarathi("")
            setAuthorNameEnglish("")
            setAuthorNameMarathi("")
            setSaintNameEnglish("")
            setSaintNameMarathi("")
            setLiteratureContent("")
            setAudioFilePath("")
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

    const fetchData = async () => {
        const response = await axios.get(`${apiLink}category/get`);
        const result = await response.data.data
        setCategoryData(result)

        const sub_category_response = await axios.get(`${apiLink}sub-category/get`);
        const sub_category_result = await sub_category_response.data.data
        setSubCategoryData(sub_category_result)
    }


    useEffect(() => {
        fetchData()
    }, [])

    return (
        <>



            <DefaultLayout>
                <Breadcrumb pageName="Add Literature" />
                <div className="grid lg:grid-cols-2 sm:grid-cols-1 md:grid-cols-2 gap-8">
                    {/* category_id dropdown */}
                    <div>
                        <label className="mb-2.5 block text-black dark:text-white">
                            Select Category

                        </label>

                        <div className=" z-20 bg-transparent dark:bg-form-input">
                            <select value={category} onChange={(e) => setCategory(e.target.value)}
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
                    {/* category_id dropdown ends */}


                    {/* sub category dropdown */}
                    <div>
                        <label className="mb-2.5 block text-black dark:text-white">
                            Select Sub Category

                        </label>

                        <div className=" z-20 bg-transparent dark:bg-form-input">
                            <select value={subCategory} onChange={(e) => setSubCategory(e.target.value)}
                                className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            >
                                
                               
                                <option value="" disabled selected className="text-body dark:text-bodydark">
                                    Select Sub Category
                                </option>
                                {
                                    (category === '') ?
                                    
                                    
                                    '' :
                                        
                                        subCategoryData.map((category) => (
                                            <option key={category.id} value={category.id} className="text-body dark:text-bodydark">
                                                {category.name} {category.id}
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
                    {/* sub category dropdown ends */}

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
export default AddLiterature;