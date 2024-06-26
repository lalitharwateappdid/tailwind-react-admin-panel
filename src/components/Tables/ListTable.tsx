import { useState, useEffect } from "react";
import { apiLink } from "../../api_link";
import axios from "axios";
import Swal from 'sweetalert2';
import DataTable, { createTheme } from 'react-data-table-component';
import { Link } from "react-router-dom";


function ListTable() {
    const [apiData, setApiData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(`${apiLink}/media/get`);
            const data = await response.json();
            setApiData(data.data);
            console.log(data);
        }
        catch (error) {
            console.error("Soemthing went wrong try again later");
        }
    }

    const handleDelete = async (id: BigInteger) => {
        console.log(id);    
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
                await axios.delete(`${apiLink}/media/destroy`, {
                    data: { id: id }
                });

                fetchData();

            };

        }
        catch (err) {
            console.log("Error delete ", err);
        }
    }

    createTheme('solarized', {
        text: {
            primary: '#fff',
            secondary: '#fff',
        },
        background: {
            default: '#24303f',
        },
        context: {
            background: '#cb4b16',
            text: '#FFFFFF',
        },
        divider: {
            default: '#fff',
        },
        action: {
            button: 'rgba(0,0,0,.54)',
            // button: "red",
            hover: 'rgba(0,0,0,.08)',
            disabled: 'rgba(0,0,0,.12)',
        },
    }, 'dark');

    const columns = [
        {
            name:"ID",
            selector: row=>row.id,
        },
        {
            name: 'Title',
            selector: row => row.title,
        },
        {
            name: 'Link',
            selector: row => row.link,
        },
        // {
        //     name: " Username",
        //     selector: row => row.email
        // },
        {
            name: "Actions",
            cell: (row) => (
                <div className="flex gap-4">
                    <button className="bg-primary px-2 py-1 rounded-md">Edit</button>
                    <button className="bg-danger px-2 py-1 rounded-md" onClick={() => handleDelete(row.id)}>Delete</button>
                </div>
            )
        }
    ];

    return (
        <>
            <div className="float-right mb-4">
                <Link to="/add-book" className="bg-primary text-white px-3 py-2 rounded-md hover:opacity-65">Add</Link>
            </div>
            <DataTable
                // title="Books"
                pagination
                columns={columns}
                fixedHeader
                data={apiData}
                highlightOnHover
                theme="solarized"
            />

          
        </>

    );

}



export default ListTable;