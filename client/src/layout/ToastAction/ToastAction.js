import {toast} from "react-toastify";
import {ERROR, INFO, SUCCESS, WARNING} from "../../constants/returnMessage";
const ToastAction = (responseMessage) => {
    switch (responseMessage.type){
        case SUCCESS:
            return toast.success(responseMessage.message, {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        case ERROR:
            return toast.error(responseMessage.message, {
                position: toast.POSITION.BOTTOM_RIGHT
            });
        case WARNING:
            return toast.warning(responseMessage.message, {
                position: toast.POSITION.BOTTOM_RIGHT
            });
        case INFO:
            return toast.info(responseMessage.message, {
                position: toast.POSITION.BOTTOM_RIGHT
            });
        default:
            return;
    }
}
export default ToastAction
