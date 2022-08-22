import React from "react";
import classes from "./MyInput.module.css";

//По мимо props/Принимает и ref(саму ссылку )
const MyInput = React.forwardRef((props, ref) => {
    return <input ref={ref} className={classes.myInput} {...props} />;
});

export default MyInput;
