import React from 'react';

import { hasAdminAccess } from 'utils/helpers';

class Admin extends React.Component {
    render() {
        return (
            <div>
                {hasAdminAccess()
                    ? 'Admin'
                    : 'You do not have access to this page'}
            </div>
        );
    }
}

export default Admin;
