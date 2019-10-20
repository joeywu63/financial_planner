import * as user from 'model/user';

export const createUser = ({ uid, email }) => user.create({ uid, email });
