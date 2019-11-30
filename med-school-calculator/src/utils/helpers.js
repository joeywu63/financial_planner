import { getCurrentUser } from 'utils/currentUser';
import { ROLES } from 'utils/constants';
import { toast } from 'react-toastify';

export const hasAdminAccess = () => {
    return getCurrentUser().role === ROLES.admin;
};

export const successToast = message => {
    toast(message, { hideProgressBar: true, type: toast.TYPE.SUCCESS });
};

export const errorToast = message => {
    const toastMessage = message ? message : 'Something went wrong';
    toast(toastMessage, { hideProgressBar: true, type: toast.TYPE.ERROR });
};
