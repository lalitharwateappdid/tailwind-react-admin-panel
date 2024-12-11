// components
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import Notify from '../../components/toast_notify/Notify';

import { useState, useEffect } from 'react';

// third party
import Select from 'react-select';
import axios from 'axios';
import Swal from 'sweetalert2';

// env
import { apiLink } from '../../api_link';

const UnMapCategory = () => {
  const [parentCategory, setParentCategory] = useState([]);
  const [childCategory, setChildCategory] = useState([]);
  const [parentCategoryId, setParentCategoryId] = useState(null);
  const [childCategoryId, setChildCategoryId] = useState(null);
  const [submit, setSubmit] = useState('Submit');

  const fetchCategory = async () => {
    const response = await axios.get(`${apiLink}category/get-category`);
    const result = await response.data.data;

    setParentCategory(result.filter((data) => data.masterCategory == '1'));
    setChildCategory(result.filter((data) => data.masterCategory == '0'));
  };

  const unMapCategory = async () => {
    try {
      setSubmit('Submitting...');
      if (parentCategoryId == null && childCategoryId == null) {
        Notify('Please Select Option from both Dropdown');
        setSubmit('Submit');
      } else {
        const response = await axios.post(`${apiLink}category/unmap-category`, {
          categoryId: parentCategoryId,
          relatedCategoryId: childCategoryId,
        });

        Notify(response.data.message);
        setParentCategoryId(null);
        setChildCategoryId(null);
        setSubmit('Submit');
      }
    } catch (err) {
      setSubmit('Submit');
      Swal.fire({
        title: 'Deleted!',
        text: `${err}`,
        icon: 'warning',
      });
      console.log('Something went wrong please try again later');
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="UnMap Category" />
      <div className="px-5 py-10 rounded-lg bg-[#fff] dark:bg-transparent shadow-xl">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <label className="mb-2.5 block text-black dark:text-white">
              Select Parent Category
            </label>

            <div className=" z-20 bg-transparent dark:bg-form-input">
              <select
                onChange={(e) => {
                  setParentCategoryId(e.target.value);
                }}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              >
                {parentCategoryId == null ? (
                  <>
                    <option
                      value="null"
                      className="text-body dark:text-bodydark"
                    >
                      Select Parent Category
                    </option>
                    {parentCategory && parentCategory.length > 0 ? (
                      parentCategory.map((category) => (
                        <option
                          key={category.id}
                          value={category.id}
                          className="text-body dark:text-bodydark"
                        >
                          {category.title}
                        </option>
                      ))
                    ) : (
                      <option disabled>No categories available</option>
                    )}
                  </>
                ) : (
                  <>
                    {parentCategory && parentCategory.length > 0 ? (
                      parentCategory.map((category) => (
                        <option
                          key={category.id}
                          value={category.id}
                          className="text-body dark:text-bodydark"
                        >
                          {category.title}
                        </option>
                      ))
                    ) : (
                      <option disabled>No categories available</option>
                    )}
                  </>
                )}
              </select>

              <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                <svg
                  className="fill-current"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g opacity="0.8">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                      fill=""
                    ></path>
                  </g>
                </svg>
              </span>
            </div>
          </div>

          <div>
            <label className="mb-2.5 block text-black dark:text-white">
              Select Child Category
            </label>

            <div className=" z-20 bg-transparent dark:bg-form-input">
              <select
                onChange={(e) => {
                  setChildCategoryId(e.target.value);
                }}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              >
                {childCategoryId == null ? (
                  <>
                    <option
                      value="null"
                      className="text-body dark:text-bodydark"
                    >
                      Select Child Category
                    </option>
                    {childCategory && childCategory.length > 0 ? (
                      childCategory.map((category) => (
                        <option
                          key={category.id}
                          value={category.id}
                          className="text-body dark:text-bodydark"
                        >
                          {category.title}
                        </option>
                      ))
                    ) : (
                      <option disabled>No categories available</option>
                    )}
                  </>
                ) : (
                  <>
                    {childCategory && parentCategory.length > 0 ? (
                      childCategory.map((category) => (
                        <option
                          key={category.id}
                          value={category.id}
                          className="text-body dark:text-bodydark"
                        >
                          {category.title}
                        </option>
                      ))
                    ) : (
                      <option disabled>No categories available</option>
                    )}
                  </>
                )}
              </select>

              <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                <svg
                  className="fill-current"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g opacity="0.8">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                      fill=""
                    ></path>
                  </g>
                </svg>
              </span>
            </div>
          </div>
        </div>
        <div className="w-50 mx-auto mt-5 mb-10">
          <button
            onClick={() => unMapCategory()}
            className="flex justify-center font-bold rounded-lg bg-primary text-white text-center w-50  py-3"
          >
            {submit}
          </button>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default UnMapCategory;
