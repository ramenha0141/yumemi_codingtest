import './Title.css';
const Title = (props) => {
    return (
        <div className='title'>
            <p>{props.children}</p>
        </div>
    );
}
export default Title;