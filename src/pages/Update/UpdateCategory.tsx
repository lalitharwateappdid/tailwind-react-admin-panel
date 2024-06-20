import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import Notify from '../../components/toast_notify/Notify';
import { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { apiLink } from '../../api_link';
import Swal from 'sweetalert2';
import axios from 'axios';


const UpdateCategory = () => {


        const { id } = useParams();
        
        const [name, setName] = useState('');
        const [description, setDescription] = useState('');
        const [coverImage,setImage] = useState("")
    
        const [update,setUpdate] = useState("Update")

        const handleImage = (e) => {
            console.log(e.target.files)
            setImage(e.target.files[0])
        }

        const handleTitle = (e) => {
            setName(e.target.values)
        }

        const handleDescription = (e) => {
            setDescription(e.target.values)
        }
      
        const getData =  async () => {
           
            try{
                const response = await axios.get(`${apiLink}category/edit/${id}`);
                const data = response.data.data
                console.log(data);
                setName(data.name)
                setDescription(data.description)
            }
            catch(err){
                console.log(err);
            }
    }

    useEffect(()=>{
        getData();
    },[]);

    const handleUpdate = async () => {
        try{
            const formData = new FormData()
            formData.append("coverImage",coverImage)
            formData.append("name",name);
            formData.append("description",description)
            formData.append("id",`${id}`)

            console.log(formData)
            setUpdate("Updating...")
            const response = await axios.put(`${apiLink}category/update`,formData,{
                headers:{
                    "Content-Type":"multipart/form-data"
                }
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
                <Breadcrumb pageName="Update Category" />

                <div className='bg-[#fff] shadow-xl rounded-lg py-10 px-5 dark:bg-transparent'>
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
                        <textarea rows="1" value={description} onChange={(e) => setDescription(e.target.value)}  placeholder="Enter quote" class="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"></textarea>
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
                <div className="w-50 mx-auto mt-5">
                    <button onClick={() => handleUpdate()}
                        className="flex justify-center font-bold rounded-lg bg-primary text-white text-center w-50  py-3"
                    >{update}</button>

                </div>
                </div>

            </DefaultLayout>


        </>
    );
}
export default UpdateCategory;