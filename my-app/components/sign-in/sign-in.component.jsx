import { signInWithGooglePopup, createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import { useContext, useState } from "react";
import { MyInput } from "../form-input/form-input.component";
import { MyButton } from "../button/button.component";
import { UserProvider, UserContext } from "../contexts/user.context";
import { Alert, Snackbar } from "@mui/material";

const defaultFormFields = {
    email: "",
    password: "",
}

const SignIn = () => {
    const [state, setStateForFormField] = useState(defaultFormFields); //defaultFormFields set defaulf value cho state => truyền destructure (*) (dòng dưới)
    const { email, password } = state; //(*)
    const [openNotify, setOpenNotify] = useState(false);
    const [typeNotify, setTyeNotify] = useState("success");

    const mess = typeNotify == "success" ? "Logined!" 
    : typeNotify == "error" ? "Wrong username or password!"
    : typeNotify == "warning" ? "Warning!" 
    : typeNotify == "info" ? "Information!" 
    : "Success!";

    const triggerNotify = (isOpen, type) => {
        setTyeNotify(type);
        setOpenNotify(isOpen);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenNotify(false);
    };

    //const {setCurrentUser, currentUser} = useContext(UserContext); //Hàm này của react có param là UserContext return {setCurrentUser, currentUser}

    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
    }

    const redirectToSignUpHandle = () => {
        window.open("/sign-up", "_self");
    }

    const redirectToHomePageHandle = () => {
        window.open("/home", "_self");
    }

    const handleLoginSubmit = async () => {
        try {
            const { user } = await signInAuthUserWithEmailAndPassword(email, password);
            triggerNotify(true, "success");
            resetFormField();
        } catch (error) {
            if (error.code == 'auth/wrong-password') {
                triggerNotify(true, "error");
            } else if (error.code == 'auth/user-not-found') {
                triggerNotify(true, "error");
            } else {
                triggerNotify(true, "error", "failed");
            }
            console.log(error);
        }
    }

    const handleChange = (e) => {

        const { name, value } = e.target; //sự kiên onChange => truyền vào destructure từ name và value của thẻ input

        setStateForFormField({ ...state, [name]: value });
        //[name]:value được xử lý động, nếu nhập vào displayname là Luan => ['displayname']: 'Luan' => truyền vào destructure (*) => defaultFormFields.displayname = value

        //này giống như setState trong kiểu class
        //defaultFormFields['displayname'] = value;
        //Kiểu cũ: setState({...state})
    };
    const resetFormField = () => {
        setStateForFormField(defaultFormFields);
    }

    return (
        <>
        <Snackbar open={openNotify} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical:"top", horizontal:"center" }}>
            <Alert onClose={handleClose} severity={typeNotify} sx={{ width: '100%' }}>
                {mess}
            </Alert>
        </Snackbar>
        <div className="sign-in">
            <div className="row justify-content-center pt-3">
                <div className="col-8 p-5  w-90">
                    <h1>Sign In</h1>
                    <h2>Already have an account?</h2>
                    <form method="post" onSubmit={(event) => {
                        event.preventDefault(); //Để đảm bảo rằng form chỉ xử lý bằng sự kiện của mình, nếu không có dòng này, form thay vì return nếu password không match thì nó sẽ submit luôn theo mặc định
                        handleLoginSubmit();
                    }}>
                        <div className="mb-3">
                            <MyInput typeName={'email'} inputId='InputEmailSignIn' labelName='Email address' inputName='email' inputValue={email} onChangeHandler={handleChange} isRequired={true} helpId='emailHelp' helpText="We'll never share your email with anyone else." />
                        </div>
                        <div className="mb-3">
                            <MyInput typeName={'password'} inputId='InputPasswordSignIn' labelName='Password' inputName='password' inputValue={password} onChangeHandler={handleChange} isRequired={true} helpId='' helpText="" />
                        </div>
                        <div className="row" style={{justifyContent: 'space-between'}}>
                            <div className="col col-lg-5 col-md-5 col-sm-5 col-xs-5" style={{display: 'flex', justifyContent: 'center'}}><MyButton buttonName={'Sign in'} buttonType={'default'} typeName='submit' /></div>
                            <div className="col col-lg-5 col-md-5 col-sm-5 col-xs-5" style={{display: 'flex', justifyContent: 'center'}}><MyButton buttonName={'Google'} buttonType={'googleSignIn'} typeName={'button'} onClickHandler={logGoogleUser} /></div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </>
    );
};

export default SignIn;