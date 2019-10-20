import { getCurrentUser } from 'utils/currentUser';
import { ROLES } from 'utils/constants';

export const hasAdminAccess = () => {
    return getCurrentUser().role === ROLES.admin;
};
