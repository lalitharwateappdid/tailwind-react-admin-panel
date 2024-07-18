import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import Notify from '../../components/toast_notify/Notify';
import { useState, useEffect } from 'react';
import { apiLink } from '../../api_link';
import Swal from 'sweetalert2';
import { InputSwitch } from "primereact/inputswitch";
import axios from 'axios';
import MarkdownEditor from '@uiw/react-markdown-editor';
import { set } from 'react-datepicker/dist/date_utils';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ModalImage from "react-modal-image";
import { apiImageLink } from "../../api_link";




const BusinessSettings = () => {


    // const [title, setTitle] = useState("");
    const [aboutTitle, setAboutTitle] = useState("")
    // const [description, setDescription] = useState("");
    const [aboutDescription, setAboutDescription] = useState("")
    const [submit, setSubmit] = useState("Submit")
    const [youtube, setYoutube] = useState("")
    const [website, setWebsite] = useState("")
    const [privacyPolicy, setPrivacyPolicy] = useState("")
    const [terms, setTerms] = useState("")
    const [contact, setContact] = useState("")
    const [android_version, SetAndroidVersion] = useState("")
    const [image, setAboutImage] = useState("")
    const [app, setApp] = useState("")
    const [forceUpdate, setForceUpdate] = useState("")
    const [maintenanaceMode, setMaintenanceMode] = useState("")
    const [appInfo, setAppInfo] = useState("")
    const [quoteTitle,setQuoteTitle] = useState("")
    const [alternativeWebsite,SetalternativeWebsite] = useState("")
    const [textContent,setTextContent] = useState("")
    const [mywants,setMyWants] = useState("")
    const [share,setShare] = useState("")
    const [getImage,setImage] = useState("")
    const [getDrawerImage,setDrawerImage] = useState("")
    

    const handleImage = (e) => {
        setAboutImage(e.target.files[0]);
    }
    
    const handleContact = (value) => {
        setContact(value)
    }

    const handleDrawerImage = (e) => {
        setDrawerImage(e.target.files[0])
    }


    // handle forceupdate input
    function handleForceUpdate(){
        if(forceUpdate == "1"){
            setForceUpdate("0")
        }
        else{
            setForceUpdate("1")
        }
    }

    function handleTerms(value){
        setTerms(value)
    }

    function handlePrivacy(value){
        setPrivacyPolicy(value)
    }

    function handleShare(value){
        setShare(value)
    }

    function handleMaintenanceMode(){
        if(maintenanaceMode == "1"){
            setMaintenanceMode("0")
        }
        else{
            setMaintenanceMode("1")
        }
    }

    // function to store books
    const createMedia = async () => {
        console.log(share)
        try {
            const formData = new FormData();
            formData.append("about_title", aboutTitle)
            formData.append("about_description", aboutDescription);
            formData.append("youtube", youtube);
            formData.append("website", website)
            formData.append("privacyPolicy", privacyPolicy)
            formData.append("terms", terms)
            formData.append("contact", contact)
            formData.append("android_version", android_version)
            formData.append("image", image);
            formData.append("app_link", app)
            formData.append("app_info", appInfo)
            formData.append("force_update",forceUpdate)
            formData.append("maintenance_mode",maintenanaceMode)
            formData.append("my_wants",mywants)
            formData.append("quote_title",quoteTitle)
            formData.append("text_content",textContent)
            formData.append("share",share)
            formData.append("drawer_image",getDrawerImage)

            setSubmit("Submitting...")

            const response = await axios.post(`${apiLink}business-settings/create`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Accept": "application/json"
                }
            });


            Notify(response.data.message);


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

    useEffect(() => {
        const fetchCategoryData = async () => {
            try {
                const category_response = await fetch(`${apiLink}business-settings/get`);
                const category_data = await category_response.json();
                console.log(category_data)

                // console.log(category_data.data); 
                setAboutTitle(category_data.data['about_title'])
                setAboutDescription(category_data.data['about_description'])
                setYoutube(category_data.data['youtube']);
                setWebsite(category_data.data['website'])
                setPrivacyPolicy(category_data.data['privacyPolicy'])
                setTerms(category_data.data['terms'])
                setContact(category_data.data['contact'])
                SetAndroidVersion(category_data.data['android_version'])
                setApp(category_data.data['app_link'])
                setAppInfo(category_data.data['app_info'])
                setForceUpdate(category_data.data["force_update"])
                setMaintenanceMode(category_data.data['maintenance_mode'])
                setMyWants(category_data.data['my_wants'])
                setQuoteTitle(category_data.data['quote_title'])
                setTextContent(category_data.data['text_content'])
                setShare(category_data.data['share'])
                setImage(category_data.data['about_image']);
                setDrawerImage(category_data.data['drawer_image']);
            

                // console.log(category_data.data["force_update"])
                // setCategoryData(category_data.data);
            } catch (error) {
                console.error("Error fetching category data:", error);
                // Handle error as needed
            }
        };

        fetchCategoryData();
    }, [])

    return (
        <>



            <DefaultLayout>
                <Breadcrumb pageName="Business Settings" />
                <div className="shadow-xl py-10 px-5 bg-[#fff] rounded-lg dark:bg-transparent">


                    {/* android section starts */}
                    <div className="grid lg:grid-cols-3 sm:grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <label className="mb-3 block text-black dark:text-white">
                                Android Version
                            </label>
                            <input
                                type="text"
                                placeholder="Enter Android Version"
                                value={android_version}
                                onChange={(e) => SetAndroidVersion(e.target.value)}
                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                        </div>

                        <div>
                            <label className="mb-3 block text-black dark:text-white">
                                Force Update
                            </label>
                            <InputSwitch className="p-invalid" onChange={handleForceUpdate} checked={forceUpdate == "1" ? true: false} />

                        </div>

                        <div>
                            <label className="mb-3 block text-black dark:text-white">
                                Maintenance Mode
                            </label>
                            <InputSwitch className="p-invalid" onChange={handleMaintenanceMode} checked={maintenanaceMode == "1" ? true : false} />

                        </div>
                    </div>
                    {/* android section ends */}
                    <div className="grid lg:grid-cols-2 sm:grid-cols-1 md:grid-cols-2 gap-8 mt-15">
                    <div>
                            <label className="mb-3 block text-black dark:text-white">
                                Quote Title
                            </label>
                            <input
                                type="text"
                                placeholder="Enter Quote Title"
                                value={quoteTitle}
                                onChange={(e) => setQuoteTitle(e.target.value)}
                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                        </div>
                   

                    <div>
                            <label className="mb-3 block text-black dark:text-white">
                                Text Content
                            </label>
                           
                            <textarea rows="1" value={textContent} onChange={(e) => setTextContent(e.target.value)} placeholder="Enter Text Content" class="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"></textarea>
                        </div>
                    </div>
                    {/* about app section starts */}
                    <h3 className="dark:text-white font-bold underline text-center my-5 ">About App</h3>
                    <div className="grid lg:grid-cols-2 sm:grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <label className="mb-3 block text-black dark:text-white">
                                Title
                            </label>
                            <input
                                type="text"
                                placeholder="Enter About Title"
                                value={aboutTitle}
                                onChange={(e) => setAboutTitle(e.target.value)}
                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                        </div>
                        <div className="grid lg:grid-cols-2 sm:grid-cols-1 md:grid-cols-2 gap-2">
                        <div>
                            <label className="mb-3 block text-black dark:text-white">
                                Image
                            </label>
                            <input
                                type="file"
                                onChange={handleImage}
                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                            {/* <img src={} alt="Brand" /> */}
                        </div>
                        <div>
                        <ModalImage className="w-30  z-9999"
                        small={`${apiImageLink}${getImage}`}
                        large={`${apiImageLink}${getImage}`}

                    />
                        </div>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                        <div>
                            <label className="mb-3 block text-black dark:text-white">
                                Description
                            </label>


                            <MarkdownEditor
                                value={aboutDescription}
                                height='200px'

                                onChange={(e) => { setAboutDescription(e) }}
                            />
                        </div>
                    </div>

                    <h3 className="dark:text-white font-bold underline text-center my-5">Drawer Image</h3>
                    <div className="grid lg:grid-cols-2 sm:grid-cols-1 md:grid-cols-2 gap-2">
                        <div>
                            <label className="mb-3 block text-black dark:text-white">
                                Drawer Image
                            </label>
                            <input
                                type="file"
                                onChange={handleDrawerImage}
                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                            {/* <img src={} alt="Brand" /> */}
                        </div>
                        <div>
                        <ModalImage className="w-30  z-9999"
                        small={`${apiImageLink}${getDrawerImage}`}
                        large={`${apiImageLink}${getDrawerImage}`}

                    />
                        </div>
                        </div>

                    {/* about app section ends */}


                    {/* youtube link section starts */}
                    <h3 className="dark:text-white font-bold underline text-center my-5">Youtube</h3>

                    <div className="grid lg:grid-cols-2 sm:grid-cols-1 md:grid-cols-2 gap-8">
                        <div>

                            <input
                                type="text"
                                placeholder="Add Youtube Link"
                                value={youtube}
                                onChange={(e) => setYoutube(e.target.value)}
                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                        </div>


                    </div>
                    {/* youtube link section ends */}

                    {/* app info starts */}
                    <h3 className="dark:text-white font-bold underline text-center my-5">App Info</h3>

                    <div className="grid lg:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-8">
                        <div>

                        <MarkdownEditor
                        height='200px' value={appInfo} onChange={(value, viewUpdate) => setAppInfo(value)} />
                        </div>


                    </div>
                    {/* app info ends */}

                    {/* website section starts */}
                    <h3 className="dark:text-white font-bold underline text-center my-5">Website</h3>
                    <div className="grid lg:grid-cols-2 sm:grid-cols-1 md:grid-cols-2 gap-8">
                        <div>

                            <input
                                type="text"
                                placeholder="Enter Website Link "
                                value={website}
                                onChange={(e) => setWebsite(e.target.value)}
                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                        </div>
                    </div>
                    {/* website section ends */}

                    {/* माझी आवड माझी गरज section starts */}
                    <h3 className="dark:text-white font-bold underline text-center my-5">माझी आवड माझी गरज</h3>
                    <div className="grid lg:grid-cols-2 sm:grid-cols-1 md:grid-cols-2 gap-8">
                        <div>

                            <input
                                type="text"
                                placeholder="Enter Website Link "
                                value={mywants}
                                onChange={(e) => setMyWants(e.target.value)}
                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                        </div>
                    </div>
                    {/* माझी आवड माझी गरज section ends */}



                    {/* app link section starts */}
                    <h3 className="dark:text-white font-bold underline text-center my-5">App Link</h3>
                    <div className="grid lg:grid-cols-2 sm:grid-cols-1 md:grid-cols-2 gap-8">
                        <div>

                            <input
                                type="text"
                                placeholder="Add App Link "
                                value={app}
                                onChange={(e => setApp(e.target.value))}
                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                        </div>
                    </div>
                    {/* app link section ends */}

                    {/* privacy policy section starts */}
                    <h3 className="dark:text-white font-bold underline text-center my-5">Privacy Policy</h3>
                    <ReactQuill className='h-[150px] rounded-lg mb-20' theme="snow" value={privacyPolicy} onChange={handlePrivacy} />
                    {/* privacy policy section ends */}

                    {/* terms and condition section starts */}
                    <h3 className="dark:text-white font-bold underline text-center my-5">Terms & Conditions</h3>
                    <ReactQuill className='h-[150px] rounded-lg mb-20' theme="snow" value={terms} onChange={handleTerms} />
                    {/* terms and condition section ends */}

                    {/* contact us section starts */}
                    <h3 className="dark:text-white font-bold underline text-center my-5">Contact Us</h3>
                    <ReactQuill className='h-[150px] rounded-lg mb-20' theme="snow" value={contact} onChange={handleContact} />
                    {/* contact us section ends */}

                    <h3 className="dark:text-white font-bold underline text-center my-5">Share Content</h3>
                    {/* <ReactQuill className='h-[150px] rounded-lg mb-20' theme="snow" value={share} onChange={handleShare} /> */}
                    <MarkdownEditor
                                value={share}
                                height='200px'

                                onChange={handleShare}
                            />


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