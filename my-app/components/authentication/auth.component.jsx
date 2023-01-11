import {SignUp} from "../sign-up/signup.component"; //export trên function
import SignIn from "../sign-in/sign-in.component"; //export default
import "./auth.styles.scss";

export const Auth = () => {
    return (
        <>
        <div className="row auth main-background" style={{paddingTop: "15px"}}>
            <div className="col-xl-5 col-lg-12 col-md-12 col-sm-12 col-12 mw-100">
                <SignIn />
            </div>
            <div className="col-xl-7 col-md-12 col-sm-12 col-12 mw-100">
                <SignUp />
            </div>
        </div>
        </>
    );
}