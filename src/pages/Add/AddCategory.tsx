import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import Notify from '../../components/toast_notify/Notify';
import { useState } from 'react';
import { apiLink } from '../../api_link';
import Swal from 'sweetalert2';
import axios from 'axios';
import { InputSwitch } from 'primereact/inputswitch';
import FormRepeater from 'react-form-repeater';


const AddCategory = () => {


    // const [name, setName] = useState("");
    // const [description, setDescription] = useState("")
    // const [submit, setSubmit] = useState("Submit")
    // const [child, setChild] = useState(false)

    // // function to store books
    // const createBook = async () => {
    //     try {
    //         setSubmit("Submitting...")
    //         const response = await axios.post(`${apiLink}category/create`, {
    //             name: name,
    //             description: description
    //         });
    //         Notify(response.data.message);
    //         setName('');
    //         setDescription('');

    //         setSubmit("Submit")
    //     }
    //     catch (err) {
    //         setSubmit("Submit")
    //         Swal.fire({
    //             title: "Deleted!",
    //             text: `${err}`,
    //             icon: "warning"
    //         });
    //         console.log("Something went wrong please try again later");
    //     }
    // }

    // return (
    //     <>



    //         <DefaultLayout>
    //             <Breadcrumb pageName="Add Category" />

                {/* <div className="px-5 py-10 rounded-lg bg-[#fff] dark:bg-transparent shadow-xl">
                    <div className="grid lg:grid-cols-2 sm:grid-cols-1 md:grid-cols-2 gap-8">

                        <div>
                            <label className="mb-3 block text-black dark:text-white">
                                Category Name
                            </label>
                            <input
                                type="text"
                                placeholder="Enter Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                        </div>
                        <div>
                            <label className="mb-3 block text-black dark:text-white">
                                Category Description
                            </label>

                            <textarea rows="1" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter Description" class="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"></textarea>

                        </div>

                        <div className="flex items-center gap-x-1 ">
                            <InputSwitch className="p-invalid" checked={child} onChange={((e) => setChild(e.target.value))} /> <span> Is There Any Child?</span>
                        </div>

                    </div>
                    <div className="w-50 mx-auto mt-5">
                        <button onClick={() => createBook()}
                            className="flex justify-center font-bold rounded-lg bg-primary text-white text-center w-50  py-3"
                        >{submit}</button>

                    </div>
                </div> */}

    //         </DefaultLayout>


    //     </>
    // );

    const [categories, setCategories] = useState([
        {
          id: 1,
          name: 'Category 1',
          children: [
            { id: 11, name: 'Child 1.1', children: [] },
            { id: 12, name: 'Child 1.2', children: [] }
          ]
        },
        {
          id: 2,
          name: 'Category 2',
          children: [
            { id: 21, name: 'Child 2.1', children: [] }
          ]
        }
      ]);
    
      const handleAddChildCategory = (parentId) => {
        const newChildCategory = {
          id: Date.now(),
          name: `New Child Category`,
          children: []
        };
    
        const updatedCategories = addCategoryRecursively(categories, parentId, newChildCategory);
    
        setCategories(updatedCategories);
      };
    
      const addCategoryRecursively = (categoriesArray, parentId, newCategory) => {
        return categoriesArray.map(category => {
          if (category.id === parentId) {
            return { ...category, children: [...category.children, newCategory] };
          } else if (category.children && category.children.length > 0) {
            return {
              ...category,
              children: addCategoryRecursively(category.children, parentId, newCategory)
            };
          } else {
            return category;
          }
        });
      };
    
      const handleRemoveCategory = (parentId, categoryId) => {
        const updatedCategories = removeCategoryRecursively(categories, parentId, categoryId);
        setCategories(updatedCategories);
      };
    
      const removeCategoryRecursively = (categoriesArray, parentId, categoryId) => {
        return categoriesArray.map(category => {
          if (category.id === parentId) {
            return {
              ...category,
              children: category.children.filter(child => child.id !== categoryId)
            };
          } else if (category.children && category.children.length > 0) {
            return {
              ...category,
              children: removeCategoryRecursively(category.children, parentId, categoryId)
            };
          } else {
            return category;
          }
        });
      };
    
      const handleCategoryNameChange = (categoryId, newName) => {
        const updatedCategories = updateCategoryNameRecursively(categories, categoryId, newName);
    
        setCategories(updatedCategories);
      };
    
      const updateCategoryNameRecursively = (categoriesArray, categoryId, newName) => {
        return categoriesArray.map(category => {
          if (category.id === categoryId) {
            return { ...category, name: newName };
          } else if (category.children && category.children.length > 0) {
            return {
              ...category,
              children: updateCategoryNameRecursively(category.children, categoryId, newName)
            };
          } else {
            return category;
          }
        });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Nested Category Form Data:', categories);
        // Handle saving data to backend or other actions
      };
    
      const renderCategories = (categoriesArray, level = 0) => {
        return (
          <div>
            {categoriesArray.map(category => (
              <div key={category.id} style={{ marginLeft: `${20 * level}px`, marginTop: '10px' }}>
                <label>
                  Category Name:
                  <input
                    type="text"
                    value={category.name}
                    onChange={(e) => handleCategoryNameChange(category.id, e.target.value)}
                  />
                </label>
                <button type="button" onClick={() => handleAddChildCategory(category.id)}>Add Child Category</button>
                <button type="button" onClick={() => handleRemoveCategory(category.id, category.id)}>Remove Category</button>
                {category.children.length > 0 && renderCategories(category.children, level + 1)}
              </div>
            ))}
          </div>
        );
      };
    
      return (
        <div>
          <h2>Nested Category Form</h2>
          <form onSubmit={handleSubmit}>
            {renderCategories(categories)}
            <button type="submit">Save Data</button>
          </form>
        </div>
      );
  
}
export default AddCategory;