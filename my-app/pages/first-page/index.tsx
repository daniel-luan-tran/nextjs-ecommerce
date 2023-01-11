import Link from "next/link";

const FirstPage = () => {
    return (
        <>
        <h1>First Page!!!</h1>
        <Link href={`first-page/second-page`}>Go to second page</Link>
        </>
    )
}
export default FirstPage;