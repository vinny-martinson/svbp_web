import { connect } from 'react-redux';
import PostList from '../components/PostList';
import { deletePost } from '../actions/postsActions';
import { blue } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';

const footer_styles = makeStyles({
  footer: {
    width: "100%",
    height: "80px",
    backgroundColor: "#3f51b5",
    marginTop: "1rem",
    padding: "-1rem -1rem",
    position: "fixed",
    bottom: 0,
    left: 0,
    boxShadow: "1px -1px 2px 2px black"
  }
})

const Footer = () => {
  const styles = footer_styles();
  return (
    <footer className={styles.footer}>
      <br/>
      <h3 style={{color: "white", marginLeft: "1rem"}}>Meedien @ University of Florida</h3>
    </footer>
  )
}

export default Footer