import { useState, useEffect } from "react";
import { apiLink } from "../../api_link";
import axios from "axios";
import Swal from 'sweetalert2';
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputSwitch } from "primereact/inputswitch";
import { Link } from "react-router-dom";
import Notify from "../toast_notify/Notify";
import ModalImage from "react-modal-image";

function ListTable() {
    const [apiData, setApiData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(`${apiLink}media/get`);
            const data = await response.json();
            setApiData(data.data);
        }
        catch (error) {
            console.error("Soemthing went wrong try again later");
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

                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
                await axios.delete(`${apiLink}media/destroy`, {
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
            const response = await axios.put(`${apiLink}media/status`, {
                id: id
            })
            fetchData()
            Notify(response.data.message)

        }
        catch (err) {
            console.error("Something went wrong " + err)
        }
    }



    return (
        <>
            <div className="float-right mb-4">
                <Link to="/add-media" className="bg-primary text-white px-3 py-2 rounded-md hover:opacity-65">Add</Link>
            </div>

            <br />
            <br />

            <DataTable paginatorClassName={"dark:bg-[#243141] dark:text-[#fff]"} value={apiData} className="shadow-xl" stripedRows paginator rows={10}
                rowsPerPageOptions={[5, 10, 25, 50]}
                tableStyle={{ minWidth: '50rem' }}>
                <Column headerClassName={"dark:text-[#fff]  dark:border-[#fff]  dark:bg-[#243141]"} bodyClassName={"dark:text-[#fff] dark:border-[#ffffff13]  dark:bg-[#243141]"} field="id" header="Sr.No" body={(item, key) => (
                    <>
                        <span>{key.rowIndex + 1}</span>
                    </>
                )} ></Column>

                <Column headerClassName={"dark:text-[#fff]  dark:border-[#fff]  dark:bg-[#243141]"} bodyClassName={"dark:text-[#fff] dark:border-[#ffffff13]  dark:bg-[#243141]"} field="title" header="Title" />
                <Column headerClassName={"dark:text-[#fff]  dark:border-[#fff]  dark:bg-[#243141]"} bodyClassName={"dark:text-[#fff] dark:border-[#ffffff13]  dark:bg-[#243141]"} field="link" header="Link" />
                <Column headerClassName={"dark:text-[#fff]  dark:border-[#fff]  dark:bg-[#243141]"} bodyClassName={"dark:text-[#fff] dark:border-[#ffffff13]  dark:bg-[#243141]"} field="thumbnail" header="Video Thumbnail"
                    body={(item, key) => (
                        <>
                            <ModalImage className="w-20  z-9999"
                                small={`${item.thumbnail}`}
                                large={`${item.thumbnail}`}

                            />
                        </>
                    )}
                />


                <Column headerClassName={"dark:text-[#fff]  dark:border-[#fff]  dark:bg-[#243141]"} bodyClassName={"dark:text-[#fff] dark:border-[#ffffff13]  dark:bg-[#243141]"} field="status" header="Status" body={(rowData) => (
                    <InputSwitch className="p-invalid" checked={rowData.status} onClick={() => handleStatus(rowData.id)} />
                )
                }>
                </Column>
                <Column headerClassName={"dark:text-[#fff]  dark:border-[#fff]  dark:bg-[#243141]"} bodyClassName={"dark:text-[#fff] dark:border-[#ffffff13]  dark:bg-[#243141]"} field="id" header="Action" body={(rowData) => (
                    <div className="flex gap-2">
                        <Link to={`/edit-media/${rowData.id}`} className="bg-primary opacity-90  p-2     text-white rounded-full hover:opacity-100 "><i className="fa-solid fa-pen"></i></Link>
                        <span onClick={() => handleDelete(rowData.id)} className="bg-red-700 opacity-90 hover:opacity-100 p-2  rounded-full text-white" ><i className="fa-solid fa-trash"></i></span>
                    </div>
                )} />

            </DataTable>


        </>

    );

}



export default ListTable;