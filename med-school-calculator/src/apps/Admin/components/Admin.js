import React from 'react';

import ExpenseList from './ExpenseList';

import { hasAdminAccess } from 'utils/helpers';

class Admin extends React.Component {
    render() {
        return (
            <div>
                {hasAdminAccess() ? (
                    <ExpenseList />
                ) : (
                    'You do not have access to this page'
                )}
            </div>
        );
    }
}

export default Admin;
