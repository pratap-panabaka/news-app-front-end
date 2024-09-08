import CustomLink from "./CustomLink";

function Header() {
    return (
        <div className='bg-toodark sticky top-0 z-50'>
            <div className='max-width h-16 flex font-custom tod justify-between items-center p-5 text-toolite font-bold'>
                <CustomLink to={"/"}>Home</CustomLink>
                <CustomLink to={"/details"}>Details</CustomLink>
            </div>
        </div>
    )
}

export default Header