import { Link, useMatch, useResolvedPath } from 'react-router-dom'

const CustomLink = (props) => {
    const obj = props;
    const { to, children } = obj;

    const isActive = useMatch({ path: useResolvedPath(to).pathname, end: true });

    return (
        <Link className={isActive ? 'text-active' : ''} to={to}>{children}</Link>
    );
};

export default CustomLink;