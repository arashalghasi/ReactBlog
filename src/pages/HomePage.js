import { Link } from "react-router-dom";
const HomePage = () => {
    return (
        <>
        <h1>This is a Home page</h1>
        <p>I am learning the React library form LinkedIn learn</p>
        <Link to={'https://www.linkedin.com/learning/'}>LinkedIn learn</Link>
        <p>To Learn how to publish it on digital Ocean</p>
        <Link to={'https://frontendmasters.com/courses/fullstack-v3/'}>Full-Stack for front-end engineers v3</Link>
        <p>For the next project I want to change my cv website entirely in react</p>
        <Link to={'https:cv.arashalghasi.me'}>Personal Website</Link>
        </>
    );
}
export default HomePage;