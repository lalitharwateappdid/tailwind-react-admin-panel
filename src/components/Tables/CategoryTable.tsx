import { useState, useEffect } from "react";
import { apiLink } from "../../api_link";
import axios from "axios";
import Swal from 'sweetalert2';
import DataTable, { createTheme } from 'react-data-table-component';
import { Link } from "react-router-dom";


function CategoryTable() {
    const [apiData, setApiData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(`${apiLink}category/get`);
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
                await axios.delete(`${apiLink}category/destroy`, {
                    data: { id: id }
                });

                fetchData();

            };

        }
        catch (err) {
            console.log("Error delete ", err);
        }
    }

    const handleEdit = async(id: BigInteger) => {
        console.log(id);   
    }

    createTheme('light', {
        text: {
            primary: 'black',
            secondary: 'black',
        },
        background: {
            className:"bg-dark"
        },
       
        divider: {
            default: 'bg-slate-600',
        },
        action: {
            button: 'rgba(0,0,0,.54)',
            // button: "red",
            hover: 'rgba(224, 31, 31, 0.08)',
            disabled: 'rgba(0,0,0,.12)',
        },
    });




    

    const customStyles = {
        rows: {
            style: {
                minHeight: '72px', // override the row height
                
            },
        },
        headCells: {
            style: {
                paddingLeft: '8px', // override the cell padding for head cells
                paddingRight: '8px',
            },
        },
        cells: {
            style: {
                paddingLeft: '8px', // override the cell padding for data cells
                paddingRight: '8px',

            },
           
        },
    };

    const columns = [
        {
            name: 'Name',
            selector: row => row.name,
        },
        {
            name: 'description',
            selector: row =>  <img className="w-10 h-10 rounded-full" src="https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Rounded avatar"/>,
        },
       
       
        {
            name: "Actions",
            cell: (row) => (
                <div className="flex gap-4">
                    <Link to={`/edit-category/${row.id}`} className="bg-primary px-2 py-1 rounded-md" >Edit</Link>
                    <button className="bg-danger px-2 py-1 rounded-md" onClick={() => handleDelete(row.id)}>Delete</button>
                </div>
            )
        }
    ];

    return (
        <>
            <div className="float-right mb-4">
                <Link to="/add-category" className="bg-primary text-white px-3 py-2 rounded-md hover:opacity-65">Add</Link>
            </div>
            <DataTable
                // title="Books"
                pagination
                columns={columns}
                fixedHeader
                data={apiData}
                highlightOnHover
                theme="light"
            />

 
        </>

    );

}



export default CategoryTable;