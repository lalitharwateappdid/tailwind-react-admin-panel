import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import Notify from '../../components/toast_notify/Notify';
import { useState } from 'react';
import { apiLink } from '../../api_link';
import Swal from 'sweetalert2';
import axios from 'axios';
import { Button } from 'primereact/button';  
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { RadioButton } from 'primereact/radiobutton';


const AddBook = () => {
    // sad

    const [name, setName] = useState("");
    const [description,setDescription] = useState("");
    const [pages_in_book,setPages] = useState("")
    const [price,setPrice] = useState("")
    const [submit, setSubmit] = useState("Submit")

    // function to store books
    const createBook = async () => {
        try {
            setSubmit("Submitting...")
            const response = await axios.post(`${apiLink}books/create`, {
                name: name,
                description:description,
                pages_in_books: pages_in_book,
                price: price,
               
            });
            console.log(response);
            Notify(response.data.message);
            setName('');
            setPages('');
            setDescription("");
            setPrice("")
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

    return (
        <>



            <DefaultLayout>
                <Breadcrumb pageName="Add Book" />
                <Button label="Submit" severity='danger'/>
                <div className="grid lg:grid-cols-3 sm:grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <label className="mb-3 block text-black dark:text-white">
                            Book Name
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
                            Book Description
                        </label>
                       
                        <textarea rows="1" value={description} onChange={(e) => setDescription(e.target.value)}  placeholder="Enter Description" class="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"></textarea>
                    </div>
                    <div>
                        <label className="mb-3 block text-black dark:text-white">
                            Pages in Book
                        </label>
                        <input
                            type="number"
                            placeholder="Enter Pages in Book"
                            value={pages_in_book}
                            onChange={(e) => setPages(e.target.value)}
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                    </div>
                    <div>
                        <label className="mb-3 block text-black dark:text-white">
                           Book Price
                        </label>
                        <input
                            type="number"
                            placeholder="Enter Price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                    </div>
                </div>
                <div className="w-50 mx-auto mt-5">
                    <button onClick={() => createBook()}
                        className="flex justify-center font-bold rounded-lg bg-primary text-white text-center w-50  py-3"
                    >{submit}</button>

                </div>

            </DefaultLayout>


        </>
    );
}
export default AddBook;