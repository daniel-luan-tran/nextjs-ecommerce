export const IsExist = (items) => {
    let check = true;
    if(items != null && typeof items != "undefined") {
        check = Object.keys(items).length === 0 && items.constructor === Object;
    } else {
        check = true;
    }
    return check ? false : true
}