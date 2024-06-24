import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import Notify from '../../components/toast_notify/Notify';
import { useState, useEffect } from 'react';
import { apiLink } from '../../api_link';
import Swal from 'sweetalert2';
import { InputSwitch } from "primereact/inputswitch";
import axios from 'axios';
import MarkdownEditor from '@uiw/react-markdown-editor';



const BusinessSettings = () => {


    // const [title, setTitle] = useState("");
    const [aboutTitle,setAboutTitle] = useState("")
    // const [description, setDescription] = useState("");
    const [aboutDescription,setAboutDescription] = useState("")
    const [submit,setSubmit] = useState("Submit")
    const [youtube,setYoutube] = useState("")
    const [website,setWebsite] = useState("")
    const [privacyPolicy, setPrivacyPolicy] = useState("")
    const [terms,setTerms] = useState("")
    const [contact,setContact] = useState("")
    const [android_version,SetAndroidVersion] = useState("") 
    const [image,setAboutImage] = useState("")
    const [app,setApp] = useState("")
    const [forceUpdate,setForceUpdate] = useState("")

    const handleImage = (e) => {
        setAboutImage(e.target.files[0]);
    }
  
    // function to store books
    const createMedia = async () => {

        try {
            const formData = new FormData();
            formData.append("about_title", aboutTitle)
            formData.append("about_description", aboutDescription);
            formData.append("youtube",youtube);
            formData.append("website",website)
            formData.append("privacyPolicy",privacyPolicy)
            formData.append("terms",terms)
            formData.append("contact",'contact')
            formData.append("android_version",'android_version')
            formData.append("image",image);
            formData.append("app_link",app)

            setSubmit("Submitting...")

            const response = await axios.post(`${apiLink}business-settings/create`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Accept":"appplication/json"
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
                console.log(category_data.data);
                setAboutTitle(category_data.data['about_title'])
                setAboutDescription(category_data.data['about_description'])
                setYoutube(category_data.data['youtube']);
                setWebsite(category_data.data['website'])
                setPrivacyPolicy(category_data.data['privacyPolicy'])
                setTerms(category_data.data['terms'])
                setContact(category_data.data['contact'])
                SetAndroidVersion(category_data.data['android_version'])
                setApp(category_data.data['app_link'])
                set
                
                


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
                        <InputSwitch className="p-invalid" checked={forceUpdate == "1" ? true: false} />
                        
                    </div>

                    <div>
                        <label className="mb-3 block text-black dark:text-white">
                            Maintenance Mode
                        </label>
                        <InputSwitch className="p-invalid" checked={true} />
                        
                    </div>
                      </div>
                    {/* android section ends */}

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

                    <div>
                        <label className="mb-3 block text-black dark:text-white">
                            Image
                        </label>
                        <input
                            type="upload"
                            placeholder="Enter About Title"
                            onChange={handleImage}
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
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
      onChange={(e) => {setAboutDescription(e.target.value)}}
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

                      {/* website section starts */}
                    <h3 className="dark:text-white font-bold underline text-center my-5">Website</h3>
                    <div className="grid lg:grid-cols-2 sm:grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                       
                        <input
                            type="text"
                            placeholder="Enter Website Link "
                            value={website}
                            onChange={(e)=>setWebsite(e.target.value)}
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                    </div>
                      </div>
                    {/* website section ends */}

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
                    <div className="grid lg:grid-cols-2 sm:grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                       
                        <input
                            type="text"
                            placeholder="Enter Privacy Policy Link "
                            value={privacyPolicy}
                            onChange={(e) => setPrivacyPolicy(e.target.value)}
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                    </div>
                      </div>
                    {/* privacy policy section ends */}

                    {/* terms and condition section starts */}
                    <h3 className="dark:text-white font-bold underline text-center my-5">Terms & Conditions</h3>
                    <div className="grid lg:grid-cols-2 sm:grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                       
                        <input
                            type="text"
                            placeholder="Enter Terms & Condition  Link "
                            value={terms}
                            onChange={(e => setTerms(e.target.value))}
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                    </div>
                      </div>
                    {/* terms and condition section ends */}

                    {/* contact us section starts */}
                    <h3 className="dark:text-white font-bold underline text-center my-5">Contact Us</h3>
                    <MarkdownEditor
                    height='200px' value={contact} onChange={(e => setContact(e.target.value))} />
                    {/* contact us section ends */}



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