import { useState, useContext } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils"
import { MyInput } from "../form-input/form-input.component";
import { MyButton } from "../button/button.component";
import { UserContext } from "../contexts/user.context";

const defaultFormFields = {
    displayname: "",
    email: "",
    password: "",
    confirmPassword: "",
}

export const SignUp = () => {
    const [state, setStateForFormField] = useState(defaultFormFields); //defaultFormFields set defaulf value cho state => truyền destructure (*) (dòng dưới)
    const { displayname, email, password, confirmPassword } = state; //(*)

    const handleChange = (e) => {

        const { name, value } = e.target; //sự kiên onChange => truyền vào destructure từ name và value của thẻ input

        setStateForFormField({ ...state, [name]: value });
        //[name]:value được xử lý động, nếu nhập vào displayname là Luan => ['displayname']: 'Luan' => truyền vào destructure (*) => defaultFormFields.displayname = value

        //này giống như setState trong kiểu class
        //defaultFormFields['displayname'] = value;
        //Kiểu cũ: setState({...state})
    };

    //const {currentUser, setCurrentUser} = useContext(UserContext);

    const isPasswordMatched = async (event) => {
        if (password != confirmPassword)
            return false;
        else
            return true;
    }

    const resetFormField = () => {
        setStateForFormField(defaultFormFields);
    }

    const handleSubmit = async () => {
        const isMatch = await isPasswordMatched();
        if (isMatch) {
            try {
                const { user } = await createAuthUserWithEmailAndPassword(email, password);
                //setCurrentUser(user);
                await createUserDocumentFromAuth(user, { displayname });
                resetFormField();
            } catch (error) {
                if (error.code == 'auth/email-already-in-use') {
                    alert('Email already in use!');
                }
            }
        } else {
            alert("Confirm password is not matched!");
        }
    }

    return (
        <div className="signup row justify-content-center pt-3">
            <div className="col-8 p-5  w-90">
                <h1>Sign Up</h1>
                <form method="post" onSubmit={(event) => {
                    event.preventDefault(); //Để đảm bảo rằng form chỉ xử lý bằng sự kiện của mình, nếu không có dòng này, form thay vì return nếu password không match thì nó sẽ submit luôn theo mặc định
                    handleSubmit();
                }}>
                    <div className="mb-3">
                        <MyInput typeName='text' inputId='InputName' labelName='Your name' inputName='displayName' inputValue={displayname} onChangeHandler={handleChange} isRequired={true} helpId='nameHelp' helpText='Enter your fullname please.' />
                    </div>
                    <div className="mb-3">
                        <MyInput typeName='email' inputId='InputEmailSignUp' labelName='Email address' inputName='email' inputValue={email} onChangeHandler={handleChange} isRequired={true} helpId='emailHelp' helpText="We'll never share your email with anyone else." />
                    </div>
                    <div className="mb-3">
                    <MyInput typeName='password' inputId='InputPasswordSignUp' labelName='Password' inputName='password' inputValue={password} onChangeHandler={handleChange} isRequired={true} helpId='' helpText="" />

                    <MyInput typeName='password' inputId='ConfirmPassword' labelName='Confirm Password' inputName='confirmPassword' inputValue={confirmPassword} onChangeHandler={handleChange} isRequired={true} helpId='' helpText="" />

                    </div>
                    <MyButton buttonName={'Sign up'} buttonType={'default'} />
                </form>
            </div>
        </div>
    );
}