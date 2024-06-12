import { useState, useEffect } from "react";
import { apiLink } from "../../api_link";
import axios from "axios";
import Swal from 'sweetalert2';
import { DataTable } from "primereact/datatable";
import { InputSwitch } from "primereact/inputswitch";
import { Column } from "primereact/column";
import { Link } from "react-router-dom";
import Notify from "../toast_notify/Notify";
import ModalImage from "react-modal-image";
import { ToggleButton } from "primereact/togglebutton";


function MasterImageTable() {
    const [apiData, setApiData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(`${apiLink}masterimage/get`);
            const data = await response.json();
            console.log(data)
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

                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
                await axios.delete(`${apiLink}masterimage/destroy`, {
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
            const response = await axios.put(`${apiLink}masterimage/status`, {
                id: id
            })
            fetchData()

            Notify(response.data.message)


        }
        catch (err) {
            console.error("Something went wrong")
        }
    }





    return (
        <>
            <div className="float-right mb-4">
                <Link to="/add-master-image" className="bg-primary text-white px-3 py-2 rounded-md hover:opacity-65">Add</Link>
            </div>

            <br />
            <br />

            <DataTable value={apiData} className="shadow-xl" stripedRows paginator rows={10}
                rowsPerPageOptions={[5, 10, 25, 50]}
                tableStyle={{ minWidth: '50rem' }}>
                <Column field="id" header="Sr.No" body={(item, key) => (
                    <>
                        <span>{key.rowIndex + 1}</span>
                    </>
                )} ></Column>


                <Column field="image" header="Image" body={(item, key) => (
                    <>
                        <ModalImage  className="w-10 rounded-full"
                            small={`${apiLink}${item.image}`}
                            large={`${apiLink}${item.image}`}
                            alt="Hello World!"
                        />
                        {/* <img className="w-10 rounded-full" src={`${apiLink}${item.image}`} alt="Your Image Alt Text" /> */}
                    </>
                )} />

                <Column field="status" header="Status" body={(rowData) => (
                    <>
                    <InputSwitch className="p-invalid" checked={rowData.status} onClick={() => handleStatus(rowData.id)} />
                    <ToggleButton onLabel="I confirm" offLabel="I reject" onIcon="pi pi-check" offIcon="pi pi-times" 
                    checked={rowData.status} onClick={() => handleStatus(rowData.id)} />
                    </>
                )
                }>
                </Column>
                <Column field="id" header="Action" body={(rowData) => (
                    <div className="flex gap-2">
                        <Link to={`/edit-content/${rowData.id}`} className="bg-primary opacity-90  p-2     text-white rounded-full hover:opacity-100 "><i className="fa-solid fa-pen"></i></Link>
                        <span onClick={() => handleDelete(rowData.id)} className="bg-red-700 opacity-90 hover:opacity-100 p-2  rounded-full text-white" ><i className="fa-solid fa-trash"></i></span>
                    </div>
                )} />

            </DataTable>


        </>

    );

}



export default MasterImageTable;