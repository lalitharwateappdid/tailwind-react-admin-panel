import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import Notify from '../../components/toast_notify/Notify';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { apiLink } from '../../api_link';
import Swal from 'sweetalert2';
import axios from 'axios';


const UpdateLiterature = () => {

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
    const [categoryData,setCategoryData] = useState([])
    const [subCategoryData,setSubCategoryData] = useState([])

    const { id } = useParams();

    

    const [update, setUpdate] = useState("Update")

    const getData = async () => {
        try {
            const response = await axios.get(`${apiLink}literature/edit/${id}`);
            const data = response.data.data

            setCategory(data.category_id)
            setSubCategory(data.sub_category_id)
            setLiteratureEnglish(data.literature_english)
            setLiteratureMarathi(data.literature_marathi)
            setLiteratureDescriptionEnglish(data.literature_description_english)
            setLiteratureDescriptionMarathi(data.literature_description_marathi)
            setAuthorNameEnglish(data.author_name_english)
            setAuthorNameMarathi(data.author_name_marathi)
            setSaintNameEnglish(data.saint_name_english)
            setSaintNameMarathi(data.saint_name_marathi)
            setLiteratureContent(data.literature_content)
            setAudioFilePath(data.audio_file_path)

        }
        catch (err) {
            console.log(err);
        }
    }

    const fetch = async() => {
        const data  = await axios.get(`${apiLink}category/get`)
        const result = await data.data.data
        setCategoryData(result)

        const subFetch = await axios.get(`${apiLink}sub-category/get`)
        const subResult = await subFetch.data.data
        setSubCategoryData(subResult)
    }

    useEffect(() => {
        getData();
        fetch()
    }, []);

    const handleUpdate = async () => {
        try {
            setUpdate("Updating...")
            const response = await axios.put(`${apiLink}literature/update`, {
                id: id,
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

                    {/* literature english starts */}
                    <div>
                        <label className="mb-2.5 block text-black dark:text-white">
                            Literature English
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Literature English"
                            value={literatureEnglish}
                            onChange={(e) => setLiteratureEnglish(e.target.value)}
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                    </div>
                    {/* literature english ends */}

                    {/* literature marathi starts */}
                    <div>
                        <label className="mb-2.5 block text-black dark:text-white">
                            Literature Marathi
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Literature Marathi"
                            value={literatureMarathi}
                            onChange={(e) => setLiteratureMarathi(e.target.value)}
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                    </div>
                    {/* literature marathi ends */}

                    {/* literature description english */}
                    <div>
                        <label className="mb-2.5 block text-black dark:text-white">
                            Literature Description English
                        </label>
                        <textarea
                            type="text"
                            placeholder="Enter Literature Description English"
                            value={literatureDescriptionEnglish}
                            onChange={(e) => setLiteratureDescriptionEnglish(e.target.value)}
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />                    </div>
                    {/* literature description english */}


                    {/* literature description marathi */}
                    <div>
                        <label className="mb-2.5 block text-black dark:text-white">
                            Literature Description Marathi
                        </label>
                        <textarea
                            type="text"
                            placeholder="Enter Literature Description Marathi"
                            value={literatureDescriptionMarathi}
                            onChange={(e) => setLiteratureDescriptionMarathi(e.target.value)}
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />                    </div> 
                    {/* literature description marathi ends */}

                    {/* author name english */}
                    <div>
                        <label className="mb-2.5 block text-black dark:text-white">
                            Author Name English
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Author Name"
                            value={authorNameEnglish}
                            onChange={(e) => setAuthorNameEnglish(e.target.value)}
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                    </div>     
                    {/* author_name_english ends */}


                    {/* author name marathi starts */}
                    <div>
                        <label className="mb-2.5 block text-black dark:text-white">
                            Author Name Marathi
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Author Name"
                            value={authorNameMarathi}
                            onChange={(e) => setAuthorNameMarathi(e.target.value)}
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                    </div>    
                    {/* author name marathi ends */}


                    {/* saint name english starts */}
                    <div>
                        <label className="mb-2.5 block text-black dark:text-white">
                            Saint Name English
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Saint Name"
                            value={saintNameEnglish}
                            onChange={(e) => setSaintNameEnglish(e.target.value)}
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                    </div>         
                    {/* saint name english ends */}


                    {/* saint name marathi */}
                    <div>
                        <label className="mb-2.5 block text-black dark:text-white">
                            Saint Name Marathi
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Saint Name"
                            value={saintNameMarathi}
                            onChange={(e) => setSaintNameMarathi(e.target.value)}
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                    </div>             
                    {/* saint name marathi ends */}

                    {/* audio_file_path */}
                    <div>
                        <label className="mb-2.5 block text-black dark:text-white">
                            Audio File Path
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Audio File Path"
                            value={audioFilePath}
                            onChange={(e) => setAudioFilePath(e.target.value)}
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                    </div>   
                    {/* audio_file_path */}

                    {/* literature content */}
                    <div>
                        <label className="mb-2.5 block text-black dark:text-white">
                            Literature Content
                        </label>
                        <textarea
                            type="text"
                            placeholder="Enter Literature Content"
                            value={literatureContent}
                            onChange={(e) => setLiteratureContent(e.target.value)}
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                    </div>        
                    {/* literature content ends */}





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
export default UpdateLiterature;