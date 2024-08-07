import { useState, useEffect } from "react";
import { apiLink } from "../../api_link";
import axios from "axios";
import Swal from 'sweetalert2';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputSwitch } from 'primereact/inputswitch';
import { InputText } from "primereact/inputtext";
import { Link } from "react-router-dom";
import Notify from "../toast_notify/Notify";
import Parser from 'html-react-parser';
import { FaSearch } from "react-icons/fa";



function LiteratureTable() {
    const [apiData, setApiData] = useState([]);
    const [value, setValue] = useState("")

    const [globalFilter, setGlobalFilter] = useState(null);

    const [categoryFilter, setCategoryFilter] = useState(null);

    const [categoryData,setCategoryData] = useState([]);

    const truncateString = (string) => {
        return string.slice(0,50) + "..."
    }

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(`${apiLink}literature/get`);
            const data = await response.json();
            console.log(data)
            setApiData(data.data);
        }
        catch (error) {
            console.error("Soemthing went wrong try again later");
        }
    }

    const getCategory = async () => {
        try {
            const response = await axios.get(`${apiLink}category/get-category`);
            const result = response.data.data;
            setCategoryData(result);
        }
        catch(err){
            console.error("Something went wrong " + err)
        }
    };

    const handleDelete = async (id: BigInteger) => {
        // console.log(id);sd
        try {
            const result = await Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",

                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            });

            if (result.isConfirmed) {

                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
                await axios.delete(`${apiLink}literature/delete`, {
                    data: { id: id }
                });

                fetchData();

            };

        }
        catch (err) {
            console.log("Error delete ", err);
        }
    }

    const handleStatus = async (id) => {
        try {
            const response = await axios.put(`${apiLink}literature/status`, {
                data: { id: id }
            });
            fetchData()
            Notify(response.data.message)
        }
        catch (err) {
            console.error(err)
        }
    }

    const handleEdit = async (id: BigInteger) => {
        console.log(id);
    }



    return (
        <>
        
         
            <div className="float-right mb-4">
                <Link to="/add-literature" className="bg-primary text-white px-3 py-2 rounded-md hover:opacity-65">Add</Link>
            </div>
            <br />
            <br />
            <div className="p-inputgroup">
            {/* <select
                            // onChange={(e) => handleCategoryChange(e.target.value)}
                            value={categoryData}
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        >
                            <option value="">Select Category</option>
                          
                                categoryData.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.title}
                                    </option>
                                ))
                            ) 
                        </select> */}
                <span className="p-inputgroup-addon">
                <FaSearch />
                </span>
                <InputText
                    type="search"
                    onInput={(e) => setGlobalFilter(e.target.value)}
                    placeholder="Global Search"
                />
            </div>
            <DataTable globalFilter={globalFilter} paginatorClassName={"dark:bg-[#243141] dark:text-[#fff]"} value={apiData} className="shadow-xl " stripedRows paginator rows={10}
                rowsPerPageOptions={[5, 10, 25, 50]}
                tableStyle={{ minWidth: '50rem' }}>
                <Column  headerClassName={"dark:text-[#fff]  dark:border-[#fff]  dark:bg-[#243141]"} bodyClassName={"dark:text-[#fff] dark:border-[#ffffff13]  dark:bg-[#243141] w-[10px]"} field="id" header="Sr.No" body={(item, key) => (
                    <>
                        <span>{key.rowIndex + 1}</span>
                    </>
                )} ></Column>
               <Column filter headerClassName={"dark:text-[#fff]   dark:border-[#fff]  dark:bg-[#243141]"} bodyClassName={"dark:text-[#fff]  dark:border-[#ffffff13]  dark:bg-[#243141] w-[20px]"} field="category.title" header="Category" />
                <Column filter headerClassName={"dark:text-[#fff]  dark:border-[#fff]  dark:bg-[#243141]"} bodyClassName={"dark:text-[#fff] dark:border-[#ffffff13]  dark:bg-[#243141] w-[20px]"} field="sr_number" header="Sr. Number" />
                <Column filter headerClassName={"dark:text-[#fff]  dark:border-[#fff]  dark:bg-[#243141]"} bodyClassName={"dark:text-[#fff] dark:border-[#ffffff13]  dark:bg-[#243141]  w-[250px]"} field="literature_content" header="Literature Content" body={(item, key) => (
                    <>
                        {Parser(
                            truncateString(item.literature_content))}
                    </>
                )} />
                <Column headerClassName={"dark:text-[#fff]  dark:border-[#fff] hidden dark:bg-[#243141]"} bodyClassName={"dark:text-[#fff] dark:border-[#ffffff13] hidden  dark:bg-[#243141]"} field="literature_english" header="Literature English" /> 
                <Column filter headerClassName={"dark:text-[#fff]  dark:border-[#fff]  dark:bg-[#243141]"} bodyClassName={"dark:text-[#fff] dark:border-[#ffffff13]   dark:bg-[#243141]  w-[250px]"} field="literature_marathi" header="Literature Marathi" />
                 <Column headerClassName={"dark:text-[#fff]  dark:border-[#fff]  hidden dark:bg-[#243141]"} bodyClassName={"dark:text-[#fff] dark:border-[#ffffff13] hidden  dark:bg-[#243141]"} field="author_name_english" header="Author Name English" /> 
                <Column filter headerClassName={"dark:text-[#fff]  dark:border-[#fff]  dark:bg-[#243141]"} bodyClassName={"dark:text-[#fff] dark:border-[#ffffff13]  dark:bg-[#243141]  w-[250px] "} field="author_name_marathi" header="Author Name Marathi" />




                <Column headerClassName={"dark:text-[#fff]  dark:border-[#fff]  dark:bg-[#243141]"} bodyClassName={"dark:text-[#fff] dark:border-[#ffffff13]  dark:bg-[#243141]  w-[20px]"} field="status" header="Status" body={(rowData) => (
                    <InputSwitch className="p-invalid" checked={rowData.status} onClick={() => handleStatus(rowData.id)} />
                )
                }>
                </Column>
                <Column field="audio_file_path" header="Audio" headerClassName={"dark:text-[#fff] dark:border-[#fff]  dark:bg-[#243141]"} bodyClassName={"dark:text-[#fff] dark:border-[#ffffff13]  dark:bg-[#243141] w-[20px]"} body={(item, key) => (
                    <a href={`${item.audio_file_path}`} target="_blank"><i className="bg-primary hover:opacity-70 transition text-white p-3 rounded-full fa-solid fa-headphones"></i></a>

                )}></Column>
                <Column headerClassName={"dark:text-[#fff]  dark:border-[#fff]  dark:bg-[#243141]"} bodyClassName={"dark:text-[#fff] dark:border-[#ffffff13]  dark:bg-[#243141]"} field="id" header="Action" body={(rowData) => (
                    <div className="flex gap-2">
                        <Link to={`/edit-literature/${rowData.id}`} className="bg-primary opacity-90  p-2     text-white rounded-full hover:opacity-100 "><i className="fa-solid fa-pen"></i></Link>
                        <span onClick={() => handleDelete(rowData.id)} className="bg-red-700 opacity-90 hover:opacity-100 p-2  rounded-full text-white" ><i className="fa-solid fa-trash"></i></span>
                    </div>
                )} />

            </DataTable>


        </>

    );

}



export default LiteratureTable;