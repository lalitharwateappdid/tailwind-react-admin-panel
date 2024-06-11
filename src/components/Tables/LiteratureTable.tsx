import { useState, useEffect } from "react";
import { apiLink } from "../../api_link";
import axios from "axios";
import Swal from 'sweetalert2';
import DataTable, { createTheme } from 'react-data-table-component';
import { Link } from "react-router-dom";


function LiteratureTable() {
    const [apiData, setApiData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(`${apiLink}literature/get`);
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

    const handleEdit = async (id: BigInteger) => {
        console.log(id);
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
            name: 'Category',
            selector: row => row.category_id,
        },
        {
            name: 'Sub-Category',
            selector: row => row.sub_category_id,
        },
        {
            name: 'Literature Name (ENG)',
            selector: row => row.literature_english,
        },
        {
            name: 'Literature Name (MAR)',
            selector: row => row.literature_marathi,
        },
        {
            name: 'Literature Description (ENG)',
            selector: row => row.literature_description_english,
        },
        {
            name: 'Author Name (ENG)',
            selector: row => row.author_name_english,
        },

        {
            name: 'Author Name (MAR)',
            selector: row => row.author_name_marathi,
        },

        {
            name: "Saint Name (ENG)",
            selector: row => row.saint_name_english,
        },
        {
            name: "Saint Name (MAR)",
            selector: row => row.saint_name_marathi,
        },
        {
            name: "literature content",
            selector: row => row.literature_content
        },


        {
            name: "Actions",
            cell: (row) => (
                <div className="flex gap-4">
                    <Link to={`/edit-literature/${row.id}`} className="bg-primary px-2 py-1 rounded-md" >Edit</Link>
                    <button className="bg-danger px-2 py-1 rounded-md" onClick={() => handleDelete(row.id)}>Delete</button>
                </div>
            )
        }
    ];

    return (
        <>
            <div className="float-right mb-4">
                <Link to="/add-literature" className="bg-primary text-white px-3 py-2 rounded-md hover:opacity-65">Add</Link>
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



export default LiteratureTable;