import { useState, useEffect } from "react";
import { apiLink } from "../../api_link";
import axios from "axios";
import Swal from 'sweetalert2';
import { DataTable } from "primereact/datatable";

import { Column } from "primereact/column";
import { Link } from "react-router-dom";
import Notify from "../toast_notify/Notify";
import ModalImage from "react-modal-image";
import { Sidebar } from 'primereact/sidebar';
import { Button } from "primereact/button";
import copy from "copy-to-clipboard";
import { InputSwitch } from "primereact/inputswitch";



function MasterImageTable() {
    const [apiData, setApiData] = useState([]);
    const [visible, setVisible] = useState(false)
    const [copyText,setCopyText] = useState("")


    const handleText = (e) => {
        setCopyText(e.target.value)
    };

    const copyToClipBoard =() => {
        copy(copyText)

    }



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
        
  <Sidebar pt={{
    root:"dark:bg-[#243141] dark:text-red-600"
  }} visible={visible} onHide={() => setVisible(false)} >
                    <h2 className="font-bold text-2xl dark:text-white">Select Image</h2>
                    <div className="flex flex-col justify-center">
                    {
                        apiData.map((item,key) => (
                            <>
                            <p className="my-10 flex justify-center">
                                <ModalImage key={key} className="w-40 "
                            small={`${apiLink}${item.image}`}
                            large={`${apiLink}${item.image}`}

                        />
                            </p >
                            {/* <p  className=" text-sm max-w-[1rem]" value={copyText} onChange={handleText}>{`${apiLink}${item.image}`}</p>

                            <button  onClick={copyToClipBoard}>Copy</button> */}
                            </>
                        ))
                    }
                    </div>
                  
                </Sidebar>
            <div className="float-right mb-4">
                <Link to="/add-master-image" className="bg-primary text-white px-3 py-2 rounded-md hover:opacity-65">Add</Link>
                
              
            </div>
            <Button className="bg-purple-200 dark:bg-primary" label="Select Image" icon="pi pi-arrow-right" onClick={() => setVisible(true)} />
                    

            <br />
            <br />

            <DataTable paginatorClassName={"dark:bg-[#243141] dark:text-[#fff]"} value={apiData} className="shadow-xl dark:text-red-900" stripedRows paginator rows={10}
                rowsPerPageOptions={[5, 10, 25, 50]}
                tableStyle={{
                    minWidth: '50rem',
                    

                }}
                emptyMessage={"No Images Found"}
          
              
                
                

            >
                <Column headerClassName={"dark:text-[#fff] dark:border-[#fff]   dark:bg-[#243141]"} bodyClassName={"dark:text-[#fff] dark:border-[#ffffff13]  dark:bg-[#243141]"}  field="id" className="dark:text-white dark:bg-black" header="Sr.No" body={(item, key) => (
                    <>
                        <span>{key.rowIndex + 1}</span>
                    </>
                )} ></Column>


                <Column headerClassName={"dark:text-[#fff] dark:border-[#fff]   dark:bg-[#243141]"} bodyClassName={"dark:text-[#fff] dark:border-[#ffffff13]  dark:bg-[#243141]"}  field="image" className="dark:text-white dark:bg-black"  header="Image" body={(item, key) => (
                    <> 
                        <ModalImage className="w-10  z-9999"
                            small={`${apiLink}${item.image}`}
                            large={`${apiLink}${item.image}`}

                        />
                        {/* <img className="w-10 rounded-full" src={`${apiLink}${item.image}`} alt="Your Image Alt Text" /> */}
                    </>
                )} />

                <Column headerClassName={"dark:text-[#fff] dark:border-[#fff]   dark:bg-[#243141]"} bodyClassName={"dark:text-[#fff] dark:border-[#ffffff13]  dark:bg-[#243141]"}  field="status" header="Status"className="dark:text-white dark:bg-black"  body={(rowData) => (
                    <>
                        <InputSwitch className="p-invalid " checked={rowData.status}   onClick={() => handleStatus(rowData.id)} />
                        {/* <Checkbox onClick={() => handleStatus(rowData.id)} checked={rowData.status}></Checkbox> */}
                        {/* <label className="inline-flex items-center cursor-pointer">
                            <input type="checkbox" value="" className="sr-only peer" onClick={() => handleStatus(rowData.id)} checked={rowData.status} />
                            <div className="relative w-11 h-6 bg-blue-100 rounded-full peer peer-focus:ring-4  dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-gray after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600 peer"></div>
                        </label> */}
                    </>
                )
                }>
                </Column>
                <Column headerClassName={"dark:text-[#fff] dark:border-[#fff]   dark:bg-[#243141]"} bodyClassName={"dark:text-[#fff] dark:border-[#ffffff13]  dark:bg-[#243141]"}  field="id" header="Action" className="dark:text-white dark:bg-black"  body={(rowData) => (
                    <div className="flex items-center gap-2">
                        <Link to={`/edit-content/${rowData.id}`} className="bg-primary opacity-90  p-2     text-white rounded-full hover:opacity-100 "><i className="fa-solid fa-pen"></i></Link>
                        <span onClick={() => handleDelete(rowData.id)} className="bg-red-700 opacity-90 hover:opacity-100 p-2  rounded-full text-white" ><i className="fa-solid fa-trash"></i></span>
                    </div>
                )} />

            </DataTable>


        </>

    );

}



export default MasterImageTable;