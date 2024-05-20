const regex = {
    password: "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})",
    phone: /^(\+?\d{1,3}[-.\s]?|0)?\d{9,12}$/
};

export default regex;