export const getAccessToken = () => localStorage.getItem('token');
export const saveAccessToken = (token) => localStorage.setItem('token', token);
