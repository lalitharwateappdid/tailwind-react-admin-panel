import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Notify = (title: String) => {

    toast.success(`${title}`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",

    });

}

export default Notify;