import { useState, useEffect } from "react";
import { apiLink } from "../../api_link";
import axios from "axios";
import Swal from 'sweetalert2';
import { Link } from "react-router-dom";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputSwitch } from 'primereact/inputswitch';

function SubCategory() {
    const [apiData, setApiData] = useState([]);


    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(`${apiLink}sub-category/get`);

            const data = await response.json();
            console.log(data)
            setApiData(data.data);
        }
        catch (error) {
            console.error("Something went wrong try again later");
        }
    }

    async function handleStatus(id) {
        try {
            await axios.put(`${apiLink}sub-category/status`, {
                data: { id: id }
            });

            fetchData()
        }

        catch (err) {
            console.log("Error delete ", err);
        }
    }

    const handleDelete = async (id: BigInteger) => {
        // console.log(id);
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
                await axios.delete(`${apiLink}sub-category/destroy`, {
                    data: { id: id }
                });
                fetchData();
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });




            };

        }
        catch (err) {
            console.log("Error delete ", err);
        }
    }






    return (
        <>
            <div className="float-right mb-4">
                <Link to="/add-sub-category" className="bg-primary text-white px-3 py-2 rounded-md hover:opacity-65">Add</Link>
            </div>
            <br />
            <br />
            <DataTable paginatorClassName={"dark:bg-[#243141] dark:text-[#fff]"} value={apiData} className="shadow-xl" stripedRows paginator rows={10}
                rowsPerPageOptions={[5, 10, 25, 50]}
                tableStyle={{ minWidth: '50rem' }}>
                <Column headerClassName={"dark:text-[#fff]  dark:border-[#fff]  dark:bg-[#243141]"} bodyClassName={"dark:text-[#fff] dark:border-[#ffffff13]  dark:bg-[#243141]"} field="id" header="Sr.No" body={(item, key) => (
                    <div>
                        <span>{key.rowIndex + 1}</span>
                    </div>
                )} ></Column>

                <Column headerClassName={"dark:text-[#fff]  dark:border-[#fff]  dark:bg-[#243141]"} bodyClassName={"dark:text-[#fff] dark:border-[#ffffff13]  dark:bg-[#243141]"} field="name" header="name" />
                <Column headerClassName={"dark:text-[#fff]  dark:border-[#fff]  dark:bg-[#243141]"} bodyClassName={"dark:text-[#fff] dark:border-[#ffffff13]  dark:bg-[#243141]"} field="description" header="description" />
                <Column headerClassName={"dark:text-[#fff]  dark:border-[#fff]  dark:bg-[#243141]"} bodyClassName={"dark:text-[#fff] dark:border-[#ffffff13]  dark:bg-[#243141]"} field="Category" header="Category" body={(item,key) => (
                        <span className="bg-slate-600 p-2 rounded-full">{item.Category.name}</span>
                ) }/>

                <Column headerClassName={"dark:text-[#fff]  dark:border-[#fff]  dark:bg-[#243141]"} bodyClassName={"dark:text-[#fff] dark:border-[#ffffff13]  dark:bg-[#243141]"} field="status" header="Status" body={(rowData) => (
                    <InputSwitch className="p-invalid" checked={rowData.status} onClick={() => handleStatus(rowData.id)} />
                )
                }>
                </Column>
                <Column headerClassName={"dark:text-[#fff]  dark:border-[#fff]  dark:bg-[#243141]"} bodyClassName={"dark:text-[#fff] dark:border-[#ffffff13]  dark:bg-[#243141]"} field="id" header="Action" body={(rowData) => (
                    <div className="flex gap-2">
                        <Link to={`/edit-sub-category/${rowData.id}`} className="bg-primary opacity-90  p-2     text-white rounded-full hover:opacity-100 "><i className="fa-solid fa-pen"></i></Link>
                        <span onClick={() => handleDelete(rowData.id)} className="bg-red-700 opacity-90 hover:opacity-100 p-2  rounded-full text-white" ><i className="fa-solid fa-trash"></i></span>
                    </div>
                )} />

            </DataTable>


        </>

    );

}



export default SubCategory;