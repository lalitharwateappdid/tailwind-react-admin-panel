import { useState, useEffect } from "react";
import { apiLink } from "../../api_link";
import axios from "axios";
import Swal from 'sweetalert2';
// import DataTable, { createTheme } from 'react-data-table-component';
import { Link } from "react-router-dom";
import Notify from '../../components/toast_notify/Notify'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputSwitch } from 'primereact/inputswitch';
import ModalImage from "react-modal-image";
import { apiImageLink } from "../../api_link";




function EbookTable() {
    const [apiData, setApiData] = useState([]);


    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(`${apiLink}ebook/get`);
            const data = await response.json();
            // console.log(data);

            setApiData(data.data);
        }
        catch (error) {
            console.error("Something went wrong try again later");
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
                await axios.delete(`${apiLink}ebook/delete`, {
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



    const handleStatus = async (id) => {

        const response = await axios.put(`${apiLink}ebook/status`, {
            id: id
        });

        fetchData()
        Notify(response.data.message)
    }

    return (
        <>
            <div className="float-right mb-4">
                <Link to="/add-ebook" className="bg-primary text-white px-3 py-2 rounded-lg hover:opacity-65">Add</Link>
            </div>
            <br />
            <br />
            <DataTable value={apiData} paginatorClassName={"dark:bg-[#243141] dark:text-[#fff]"} paginator rows={10}

                rowsPerPageOptions={[5, 10, 25, 50]}
                tableStyle={{ minWidth: '50rem' }}

            >
                <Column field="id" header="Sr.No" headerClassName={"dark:text-[#fff]  dark:border-[#fff]  dark:bg-[#243141]"} bodyClassName={"dark:text-[#fff] dark:border-[#ffffff13] dark:bg-[#243141]"} body={(item, key) => (
                    <>
                        <span>{key.rowIndex + 1}</span>
                    </>
                )} ></Column>
                <Column field="name" header="Name" headerClassName={"dark:text-[#fff]  dark:border-[#fff]  dark:bg-[#243141]"} bodyClassName={"dark:text-[#fff] dark:border-[#ffffff13]  dark:bg-[#243141]"}></Column>
                <Column field="description" header="Description" headerClassName={"dark:text-[#fff] dark:border-[#fff]  dark:bg-[#243141]"} bodyClassName={"dark:text-[#fff] dark:border-[#ffffff13]  dark:bg-[#243141]"}></Column>
                <Column field="authorName" header="Author Name" headerClassName={"dark:text-[#fff] dark:border-[#fff]  dark:bg-[#243141]"} bodyClassName={"dark:text-[#fff] dark:border-[#ffffff13]  dark:bg-[#243141]"}></Column>
                <Column field="coverPath" header="Cover Path" headerClassName={"dark:text-[#fff] dark:border-[#fff]  dark:bg-[#243141]"} bodyClassName={"dark:text-[#fff] dark:border-[#ffffff13]  dark:bg-[#243141]"} body={(item, key) => (

                    <ModalImage className="w-10  z-9999"
                        small={`${item.coverPath}`}
                        large={`${item.coverPath}`}

                    />
                )}></Column>
                <Column field="pdfPath" header="PDF Path" headerClassName={"dark:text-[#fff] dark:border-[#fff]  dark:bg-[#243141]"} bodyClassName={"dark:text-[#fff] dark:border-[#ffffff13]  dark:bg-[#243141]"} body={(item, key) => (
                    <a href={`${item.pdfPath}`} target="_blank"><i className="bg-primary hover:opacity-70 transition text-white p-3 rounded-full fa-solid fa-eye"></i></a>

                )}></Column>
                <Column field="status" header="Status" headerClassName={"dark:text-[#fff] dark:border-[#fff]  dark:bg-[#243141]"} bodyClassName={"dark:text-[#fff] dark:border-[#ffffff13]  dark:bg-[#243141]"} body={(rowData) => (
                    <InputSwitch className="p-invalid" checked={rowData.status} onClick={() => handleStatus(rowData.id)} />
                )
                }>
                </Column>
                <Column field="id" header="Action" headerClassName={"dark:text-[#fff] dark:border-[#fff]   dark:bg-[#243141]"} bodyClassName={"dark:text-[#fff] dark:border-[#ffffff13]  dark:bg-[#243141]"} body={(rowData) => (
                    <div className="flex gap-2">
                        <Link to={`/edit-ebook/${rowData.id}`} className="bg-primary opacity-90  p-2     text-white rounded-full hover:opacity-100 "><i className="fa-solid fa-pen"></i></Link>
                        <span onClick={() => handleDelete(rowData.id)} className="bg-red-700 opacity-90 hover:opacity-100 p-2   rounded-full text-white" ><i className="fa-solid fa-trash"></i></span>
                    </div>
                )} />

            </DataTable>


        </>

    );

}



export default EbookTable;