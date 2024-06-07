import { useState, useEffect } from "react";
import { apiLink } from "../../api_link";
import axios from "axios";
import Swal from 'sweetalert2';
// import DataTable, { createTheme } from 'react-data-table-component';
import { Link } from "react-router-dom";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from "primereact/button";
import { Toolbar } from 'primereact/toolbar';

function BookTable() {
    const [apiData, setApiData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(`${apiLink}books/get`);
            const data = await response.json();
            console.log(data);

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
                await axios.delete(`${apiLink}books/destroy`, {
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

    const handleEdit = async (id: BigInteger) => {
        console.log(id);
    }

    // createTheme('solarized', {
    //     text: {
    //         primary: '#fff',
    //         secondary: '#fff',
    //     },
    //     background: {
    //         default: '#24303f',
    //     },
    //     context: {
    //         background: '#cb4b16',
    //         text: '#FFFFFF',
    //     },
    //     divider: {
    //         default: '#fff',
    //     },
    //     action: {
    //         button: 'rgba(0,0,0,.54)',
    //         // button: "red",
    //         hover: 'rgba(0,0,0,.08)',
    //         disabled: 'rgba(0,0,0,.12)',
    //     },
    // }, 'dark');

    // const columns = [
    //     {
    //         name: 'Name',
    //         selector: row => row.name,
    //     },
    //     {
    //         name: 'description',
    //         selector: row => row.description,
    //     },
    //     {
    //         name: 'Pages in Book',
    //         selector: row => row.pages_in_books,
    //     },
    //     {
    //         name: 'Price',
    //         selector: row => row.price,
    //     },

    //     {
    //         name: "Actions",
    //         cell: (row) => (
    //             <div className="flex gap-4">
    //                 <Link to={`/edit-book/${row.id}`} className="bg-primary px-2 py-1 rounded-md" >Edit</Link>
    //                 <button className="bg-danger px-2 py-1 rounded-md" onClick={() => handleDelete(row.id)}>Delete</button>
    //             </div>
    //         )
    //     }
    // ];

    return (
        <>
            {/* <div className="float-right mb-4">
                <Link to="/add-book" className="bg-primary text-white px-3 py-2 rounded-md hover:opacity-65">Add</Link>
            </div> */}
            {/* <DataTable
                // title="Books"
                pagination
                columns={columns}
                fixedHeader
                data={apiData}
                highlightOnHover
                theme="solarized"
            /> */}

           <div>
           <Toolbar className="mb-4" right={<>
                <Link  to="/add-book" className="bg-primary opacity-90 text-white px-3 py-2 rounded-md hover:opacity-100" >Add</Link>
                </>}></Toolbar>
            <DataTable value={apiData} stripedRows paginator rows={10}
            rowsPerPageOptions={[5, 10, 25, 50]}
            tableStyle={{ minWidth: '50rem' }}>

                <Column field="name" header="Name"></Column>
                <Column field="description" header="Description"></Column>
                <Column field="pages_in_books" header="Pages in Book"></Column>
                <Column field="price" header="Price"></Column>
                <Column header="Status">
                
                </Column>
                <Column field="id" header="Action" body={<div className="flex gap-2">
                <Link to="/edit-book/{id}" className="bg-primary opacity-90 text-white px-3 py-2 rounded-md hover:opacity-100">Edit</Link>
                <Link className="bg-red-700 opacity-90 hover:opacity-100 py-2 px-4 rounded-md text-white" to="/">Delete</Link>
                </div>}></Column>

            </DataTable>
            </div>


        </>

    );

}



export default BookTable;