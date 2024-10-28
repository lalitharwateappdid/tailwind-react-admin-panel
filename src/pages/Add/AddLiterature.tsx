import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import Notify from '../../components/toast_notify/Notify';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { apiLink } from '../../api_link';
import ModalImage from "react-modal-image";

const AddLiterature = () => {
    const [categoryId,setCategoryId] = useState("")

    const [image,setImage] = useState("")

    const [category, setCategory] = useState('');
    const [subCategory, setSubCategory] = useState('');
    const [subSubCategory, setSubSubCategory] = useState('');
    const [subSubSubCategory, setSubSubSubCategory] = useState(''); // Added state for subsubsubcategory
    const [subSubSubSubCategory, setSubSubSubSubCategory] = useState(''); // Added state for subsubsubsubcategory
    // Add more as needed for deeper levels

    const [literatureEnglish, setLiteratureEnglish] = useState('');
    const [literatureMarathi, setLiteratureMarathi] = useState('');
    const [authorNameEnglish, setAuthorNameEnglish] = useState('');
    const [authorNameMarathi, setAuthorNameMarathi] = useState('');
    const [literatureContent, setLiteratureContent] = useState('');
    const [audioFilePath, setAudioFilePath] = useState('');
    const [literaturePDF, setLiteraturePDF] = useState('');
    const [sr_no, setSrNo] = useState('');
    const [submit, setSubmit] = useState('Submit');

    // States for dropdown options
    const [categoryData, setCategoryData] = useState([]);
    const [subCategoryData, setSubCategoryData] = useState([]);
    const [subSubCategoryData, setSubSubCategoryData] = useState([]);
    const [subSubSubCategoryData, setSubSubSubCategoryData] = useState([]); // State for subsubsubcategory data
    const [subSubSubSubCategoryData, setSubSubSubSubCategoryData] = useState([]); // State for subsubsubsubcategory data
    // Add more as needed for deeper levels

    const [showSubCategory, setShowSubCategory] = useState(false); // State to control visibility of sub-category dropdown
    const [showSubSubCategory, setShowSubSubCategory] = useState(false); // State to control visibility of sub-sub-category dropdown
//    const[showSubSubSubCategory,setShowSubSubSubCategory] = useState(false)
    const [showSubSubSubCategory, setShowSubSubSubCategory] = useState(false); // State to control visibility of subsubsubcategory dropdown
    const [showSubSubSubSubCategory, setShowSubSubSubSubCategory] = useState(false); // State to control visibility of subsubsubsubcategory dropdown
    // Add more as needed for deeper levels

    // Function to handle PDF file input
    const handlePDF = (e) => {
        setLiteraturePDF(e.target.files[0]);
    };

    // Function to handle audio file input
    const handleAudio = (e) => {
        setAudioFilePath(e.target.files[0]);
    };

    const handleImage = (e) => {
        setImage(e.target.files[0]);
    };

    // Function to handle rich text editor content change
    const handleContent = (value) => {
        setLiteratureContent(value);
    };

    // Function to fetch categories from API
    const getCategory = async () => {
        try {
            const response = await axios.get(`${apiLink}category/get-category`);
            const result = response.data.data;
            setCategoryData(result);
            setCategoryId(result)
        } catch (error) {
            setSubmit("Submit");
            Notify("Something went wrong" + error);
            console.log("Something went wrong " + error);
        }
    };

    // Function to fetch sub-categories based on selected category
    const getSubCategory = async (categoryId) => {
        try {
            const response = await axios.get(`${apiLink}v1/category/get-by-id?id=${categoryId}`);
            const result = response.data.data;
            if (result.relatedCategories.length > 0) {
                setSubCategoryData(result.relatedCategories);
                setCategoryId(result.relatedCategories)
                setShowSubCategory(true); // Show sub-category dropdown
            } else {
                setSubCategoryData([]);
                setShowSubCategory(false); // Hide sub-category dropdown
            }
            // Reset deeper level states and data
            setSubSubCategory('');
            setSubSubCategoryData([]);
            setShowSubSubCategory(false);

            // Reset deeper level states and data
            setSubSubSubCategory('');
            setSubSubSubCategoryData([]);
            setShowSubSubSubCategory(false);

            // Reset deeper level states and data
            setSubSubSubSubCategory('');
            setSubSubSubSubCategoryData([]);
            setShowSubSubSubSubCategory(false);
            // Add more as needed for deeper levels
        } catch (error) {
            setSubmit("Submit");
            Notify("Something went wrong" + error);
            console.log("Something went wrong " + error);
        }
    };

    // Function to fetch sub-sub-categories based on selected sub-category
    const getSubSubCategory = async (subCategoryId) => {
        try {
            const response = await axios.get(`${apiLink}v1/category/get-by-id?id=${subCategoryId}`);
            const result = response.data.data;
            if (result.relatedCategories.length > 0) {
                setSubSubCategoryData(result.relatedCategories);
                setCategoryId(result.relatedCategories)
                setShowSubSubCategory(true); // Show sub-sub-category dropdown
            } else {
                setSubSubCategoryData([]);
                setShowSubSubCategory(false); // Hide sub-sub-category dropdown
            }
            // Reset deeper level states and data
            setSubSubSubCategory('');
            setSubSubSubCategoryData([]);
            setShowSubSubSubCategory(false);

            // Reset deeper level states and data
            setSubSubSubSubCategory('');
            setSubSubSubSubCategoryData([]);
            setShowSubSubSubSubCategory(false);
            // Add more as needed for deeper levels
        } catch (error) {
            setSubmit("Submit");
            Notify("Something went wrong" + error);
            console.log("Something went wrong " + error);
        }
    };

    // Function to fetch sub-sub-sub-categories based on selected sub-sub-category
    const getSubSubSubCategory = async (subSubCategoryId) => {
        try {
            const response = await axios.get(`${apiLink}v1/category/get-by-id?id=${subSubCategoryId}`);
            const result = response.data.data;
            if (result.relatedCategories.length > 0) {
                setSubSubSubCategoryData(result.relatedCategories);
                setCategoryId(result.relatedCategories)
                    
                setShowSubSubSubCategory(true); // Show sub-sub-sub-category dropdown
            } else {
                setSubSubSubCategoryData([]);
                setShowSubSubSubCategory(false); // Hide sub-sub-sub-category dropdown
            }
            // Reset deeper level states and data
            setSubSubSubSubCategory('');
            setSubSubSubSubCategoryData([]);
            SubSubSubCategory(false);
            // Add more as needed for deeper levels
        } catch (error) {
            setSubmit("Submit");
            Notify("Something went wrong" + error);
            console.log("Something went wrong " + error);
        }
    };

    // Function to fetch sub-sub-sub-sub-categories based on selected sub-sub-sub-category
const getSubSubSubSubCategory = async (subSubSubCategoryId) => {
    try {
        const response = await axios.get(`${apiLink}v1/category/get-by-id?id=${subSubSubCategoryId}`);
        const result = response.data.data;
        if (result.relatedCategories.length > 0) {
            setSubSubSubSubCategoryData(result.relatedCategories);
            setCategoryId(result.relatedCategories)
            setShowSubSubSubSubCategory(true); // Show sub-sub-sub-sub-category dropdown
        } else {
            setSubSubSubSubCategoryData([]);
            setShowSubSubSubSubCategory(false); // Hide sub-sub-sub-sub-category dropdown
        }
        // Add more as needed for deeper levels
    } catch (error) {
        setSubmit("Submit");
        Notify("Something went wrong" + error);
        console.log("Something went wrong " + error);
    }
};

// Function to handle form submission
const create = async () => {
    try {
        
        const formData = new FormData();
        formData.append("literature_pdf", literaturePDF);
        formData.append("literatureAudio", audioFilePath);
        formData.append("literature_english", literatureEnglish);
        formData.append("literature_marathi", literatureMarathi);
        formData.append("author_name_marathi", authorNameMarathi);
        formData.append("author_name_english", authorNameEnglish);
        formData.append("literature_content", literatureContent);
        formData.append("literatureImage",image)
        formData.append("category_id",  category); // Use the deepest selected category
        formData.append("sr_no", sr_no);

        setSubmit("Submitting...");

        const response = await axios.post(`${apiLink}literature/create`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });

        Notify(response.data.message);
        setSubmit("Submit");
    } catch (error) {
        setSubmit("Submit");
        Notify("Something went wrong" + error);
        console.log("Something went wrong " + error);
    }
};

// Effect hook to fetch categories on component mount
useEffect(() => {
    getCategory();
}, []);

// Function to handle category change
const handleCategoryChange = async (categoryId) => {
    setCategory(categoryId);
    await getSubCategory(categoryId); // Wait for sub-categories to be fetched
};

// Function to handle sub-category change
const handleSubCategoryChange = async (subCategoryId) => {
    setSubCategory(subCategoryId);
    await getSubSubCategory(subCategoryId); // Wait for sub-sub-categories to be fetched
};

// Function to handle sub-sub-category change
const handleSubSubCategoryChange = async (subSubCategoryId) => {
    setSubSubCategory(subSubCategoryId);
    await getSubSubSubCategory(subSubCategoryId); // Wait for sub-sub-sub-categories to be fetched
};

// Function to handle sub-sub-sub-category change
const handleSubSubSubCategoryChange = async (subSubSubCategoryId) => {
    setSubSubSubCategory(subSubSubCategoryId);
    await getSubSubSubSubCategory(subSubSubCategoryId); // Wait for sub-sub-sub-sub-categories to be fetched
};

// Recursive function to render nested sub-category dropdowns
const renderSubCategories = (categories) => {
    return categories.map((cat) => (
        <option key={cat.id} value={cat.id}>
            {cat.title}
        </option>
    ));
};

return (
    <>
        <DefaultLayout>
            <Breadcrumb pageName="Add Literature" />
            <div className='bg-[#fff] px-5 py-10 rounded-lg shadow-xl dark:bg-transparent'>
                <div className="grid lg:grid-cols-2 sm:grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Select Category */}
                    <div>
                        <label className="mb-2.5 block text-black dark:text-white">
                            Select Category
                        </label>
                        <select
                            onChange={(e) => handleCategoryChange(e.target.value)}
                            value={category}
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        >
                            <option value="">Select Category</option>
                            {categoryData.length > 0 ? (
                                categoryData.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.title}
                                    </option>
                                ))
                            ) : (
                                <option disabled>Loading...</option>
                            )}
                        </select>
                    </div>

                  

                    {/* Add more dropdowns for deeper levels as needed */}

                    {/* Other form inputs */}
                    <div>
                        <label className="mb-2.5 block text-black dark:text-white">
                            Sr No
                        </label>
                        <input
                            type="number"
                            placeholder="Enter Sr No"
                            value={sr_no}
                            onChange={(e) => setSrNo(e.target.value)}
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                    </div>

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

                    <div>
                        <label className="mb-2.5 block text-black dark:text-white">
                            Audio File Path
                        </label>
                        <input
                            type="file"
                            placeholder="Enter Audio File Path"
                            onChange={handleAudio}
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                    </div>

                    <div>
                        <label className="mb-2.5 block text-black dark:text-white">
                        Image (optional)
                        </label>
                        <input
                            type="file"
                            placeholder="Upload Image"
                            onChange={handleImage}
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                    </div>

                 

                </div>
                <div>
                        <label className="mb-2.5 mt-[2.5rem] block text-black dark:text-white">
                            Literature Content
                        </label>
                        <ReactQuill
                            className='h-[350px] rounded-lg mb-20'
                            theme="snow"
                            value={literatureContent}
                            onChange={handleContent}
                        />
                    </div>
                    <div className="w-50 mx-auto mt-5">
                        <button
                            onClick={() => create()}
                            className="flex justify-center font-bold rounded-lg bg-primary text-white text-center w-50  py-3"
                        >
                            {submit}
                        </button>
                    </div>
            </div>
        </DefaultLayout>
    </>
);

};

export default AddLiterature;
