import { LoadingV1 } from "./loading-v1.component";
import { LoadingV2 } from "./loading-v2.component";
import '../homepage/homepage.styles.scss';
import '../directory/directory.styles.scss';
import '../menu-item/menu-item.styles.scss';
export const LoadingV3 = () => {
    return (
        <>
        <div style={{paddingTop: "85px"}}>
            <LoadingV1 />
            <div className='homepage' style={{paddingTop: "15px"}}>
                <div className='directory-menu'>
                    <LoadingV2 />
                </div>
            </div>
        </div>
        </>
    );
}