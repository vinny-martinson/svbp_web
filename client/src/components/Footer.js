import { connect } from 'react-redux';
import PostList from '../components/PostList';
import { deletePost } from '../actions/postsActions';
import { blue } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';

const footer_styles = makeStyles({
  footer: {
    width: "100%",
    height: "80px",
    marginTop: "80px",
    backgroundColor: "#3f51b5",
    position: "relative",
    boxShadow: "1px -1px 2px 2px black",
    
    social: {
      width: "100%",
      paddingTop: "8px",
  
      display: "flex",
      justifyContent: "center",
    },
  
    copyright: {
      position: "absolute",
      bottom: "18px",
  
      width: "100%",
      textAlign: "left",
      color: "white",
    }
  }
})

const Footer = () => {
  const styles = footer_styles();
  return (
    <footer className={styles.footer}>
      <br/>
      <h3 style={{color: "white", bottom: "8px !important"}} className={styles.footer.copyright}>Meedien @ University of Florida</h3>
    </footer>
  )
}

export default Footer